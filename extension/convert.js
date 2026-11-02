// Converts Google Maps URLs to Apple Maps URLs and back.
// Both converters return null when the link has nothing the other app can use.

const APPLE_MAPS = "https://maps.apple.com/";
const COORDS = /^-?\d+(\.\d+)?,\s*-?\d+(\.\d+)?$/;
const GOOGLE_MAPS = "https://www.google.com/maps/";
const TRAVEL_MODES = { driving: "d", walking: "w", transit: "r", bicycling: "w" };
const GOOGLE_MODES = { d: "driving", w: "walking", r: "transit", driving: "driving", walking: "walking", transit: "transit" };

function clean(text) {
  if (!text) return "";
  const decoded = text.replace(/\+/g, " ");
  try {
    return decodeURIComponent(decoded).trim();
  } catch {
    return decoded.trim();
  }
}

// Exact pin coordinates (!3d..!4d..) beat the viewport centre (@lat,lng).
function findCoords(pathname) {
  const pin = pathname.match(/!3d(-?\d+(?:\.\d+)?)!4d(-?\d+(?:\.\d+)?)/);
  if (pin) return `${pin[1]},${pin[2]}`;
  const view = pathname.match(/@(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/);
  return view ? `${view[1]},${view[2]}` : null;
}

function pathSegments(pathname, after) {
  const rest = pathname.split(`/${after}/`)[1] || "";
  return rest
    .split("/")
    .filter((s) => s && !s.startsWith("@") && !s.startsWith("data="))
    .map(clean);
}

function appleUrl(params) {
  const query = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return `${APPLE_MAPS}?${query}`;
}

function stripLoc(q) {
  return q.replace(/^loc:/, "");
}

function convertDirections(url, segments) {
  const p = url.searchParams;
  let origin = clean(p.get("origin") || p.get("saddr"));
  let destination = clean(p.get("destination") || p.get("daddr"));
  if (!origin && !destination && segments.length) {
    // Apple Maps takes one stop each; intermediate waypoints are dropped.
    [origin] = segments;
    destination = segments.length > 1 ? segments[segments.length - 1] : "";
    if (!destination) [origin, destination] = ["", origin];
  }
  if (!destination) return null;
  return appleUrl({
    saddr: stripLoc(origin),
    daddr: stripLoc(destination),
    dirflg: TRAVEL_MODES[p.get("travelmode")] || "",
  });
}

function convertGoogleMapsUrl(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const p = url.searchParams;
  const path = url.pathname;
  const coords = findCoords(path);

  if (path.includes("/dir/") || p.has("destination") || p.has("daddr")) {
    return convertDirections(url, pathSegments(path, "dir"));
  }

  if (path.includes("/place/")) {
    const [name] = pathSegments(path, "place");
    const label = name && !COORDS.test(name) ? name : "";
    if (!label && !coords && !COORDS.test(name || "")) {
      return p.get("q") ? appleUrl({ q: stripLoc(clean(p.get("q"))) }) : null;
    }
    return appleUrl({ q: label || coords || name, ll: coords || name });
  }

  if (path.includes("/search/")) {
    const [query] = pathSegments(path, "search");
    if (query) return appleUrl({ q: stripLoc(query), sll: coords });
  }

  const q = clean(p.get("q") || p.get("query"));
  if (q) {
    const ll = p.get("ll") || (COORDS.test(stripLoc(q)) ? stripLoc(q) : coords);
    return appleUrl({ q: stripLoc(q), ll, sll: COORDS.test(stripLoc(q)) ? "" : p.get("sll") });
  }

  const center = p.get("ll") || p.get("center") || coords;
  if (center) return appleUrl({ ll: center, q: center });

  return null;
}

function googleUrl(path, params) {
  const query = new URLSearchParams({ api: "1" });
  for (const [key, value] of Object.entries(params)) {
    if (value) query.set(key, value);
  }
  return `${GOOGLE_MAPS}${path}?${query}`;
}

function convertAppleDirections(p) {
  const origin = clean(p.get("saddr") || p.get("source"));
  const destination = clean(p.get("daddr") || p.get("destination"));
  if (!destination) return null;
  return googleUrl("dir/", {
    origin: origin === "Current Location" ? "" : origin,
    destination,
    travelmode: GOOGLE_MODES[p.get("dirflg") || p.get("mode")] || "",
  });
}

function convertAppleMapsUrl(href) {
  let url;
  try {
    url = new URL(href);
  } catch {
    return null;
  }
  const p = url.searchParams;

  if (url.pathname.startsWith("/directions") || p.has("daddr") || p.has("destination")) {
    return convertAppleDirections(p);
  }

  const coords = p.get("coordinate") || p.get("ll");
  const name = clean(p.get("name") || p.get("q"));
  const label = COORDS.test(name) ? "" : name;

  // A name plus coordinates keeps both the label and the exact spot.
  if (label && coords) {
    return `${GOOGLE_MAPS}place/${encodeURIComponent(label)}/@${coords},17z`;
  }
  const query = label || coords || clean(p.get("address"));
  return query ? googleUrl("search/", { query }) : null;
}

if (typeof module !== "undefined") module.exports = { convertGoogleMapsUrl, convertAppleMapsUrl };
