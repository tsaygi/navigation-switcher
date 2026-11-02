const test = require("node:test");
const assert = require("node:assert");
const { convertGoogleMapsUrl } = require("../extension/convert.js");

const cases = [
  [
    "place with pin coordinates",
    "https://www.google.com/maps/place/Tokyo+Tower/@35.6585,139.7454,17z/data=!3m1!4b1!4m6!3m5!1s0x0:0x1!8m2!3d35.6586!4d139.7455",
    "https://maps.apple.com/?q=Tokyo+Tower&ll=35.6586%2C139.7455",
  ],
  [
    "place with viewport only",
    "https://www.google.com/maps/place/Caf%C3%A9+de+Paris/@48.85,2.35,15z",
    "https://maps.apple.com/?q=Caf%C3%A9+de+Paris&ll=48.85%2C2.35",
  ],
  [
    "bare coordinates",
    "https://www.google.com/maps/place/35.6586,139.7455",
    "https://maps.apple.com/?q=35.6586%2C139.7455&ll=35.6586%2C139.7455",
  ],
  [
    "q=lat,lng",
    "https://maps.google.com/?q=35.6586,139.7455",
    "https://maps.apple.com/?q=35.6586%2C139.7455&ll=35.6586%2C139.7455",
  ],
  [
    "api=1 search",
    "https://www.google.com/maps/search/?api=1&query=Shibuya+Station",
    "https://maps.apple.com/?q=Shibuya+Station",
  ],
  [
    "search path",
    "https://www.google.com/maps/search/ramen/@35.66,139.70,15z",
    "https://maps.apple.com/?q=ramen&sll=35.66%2C139.70",
  ],
  [
    "directions path",
    "https://www.google.com/maps/dir/Shibuya+Station/Tokyo+Tower/@35.6,139.7,12z",
    "https://maps.apple.com/?saddr=Shibuya+Station&daddr=Tokyo+Tower",
  ],
  [
    "directions api with mode",
    "https://www.google.com/maps/dir/?api=1&destination=Tokyo+Tower&travelmode=walking",
    "https://maps.apple.com/?daddr=Tokyo+Tower&dirflg=w",
  ],
  [
    "directions to one place",
    "https://www.google.com/maps/dir//Tokyo+Tower/",
    "https://maps.apple.com/?daddr=Tokyo+Tower",
  ],
  [
    "map view only",
    "https://www.google.com/maps/@35.6586,139.7455,15z",
    "https://maps.apple.com/?ll=35.6586%2C139.7455&q=35.6586%2C139.7455",
  ],
];

for (const [name, input, expected] of cases) {
  test(name, () => assert.strictEqual(convertGoogleMapsUrl(input), expected));
}

test("unconvertible link returns null", () => {
  assert.strictEqual(convertGoogleMapsUrl("https://www.google.com/maps"), null);
});

test("garbage returns null", () => {
  assert.strictEqual(convertGoogleMapsUrl("not a url"), null);
});

const { convertAppleMapsUrl } = require("../extension/convert.js");

const GOOGLE = "https://www.google.com/maps/";
const appleCases = [
  [
    "share link with name and coordinate",
    "https://maps.apple.com/place?address=1+Chome-1-2+Oshiage&coordinate=35.7101,139.8107&name=Tokyo+Skytree",
    `${GOOGLE}place/Tokyo%20Skytree/@35.7101,139.8107,17z`,
  ],
  [
    "q with ll",
    "https://maps.apple.com/?q=Tokyo+Tower&ll=35.6586,139.7455",
    `${GOOGLE}place/Tokyo%20Tower/@35.6586,139.7455,17z`,
  ],
  [
    "ll only",
    "https://maps.apple.com/?ll=35.6586,139.7455",
    `${GOOGLE}search/?api=1&query=35.6586%2C139.7455`,
  ],
  ["q only", "https://maps.apple.com/?q=ramen", `${GOOGLE}search/?api=1&query=ramen`],
  [
    "address only",
    "https://maps.apple.com/?address=1+Infinite+Loop",
    `${GOOGLE}search/?api=1&query=1+Infinite+Loop`,
  ],
  [
    "directions with mode",
    "https://maps.apple.com/?saddr=Shibuya+Station&daddr=Tokyo+Tower&dirflg=w",
    `${GOOGLE}dir/?api=1&origin=Shibuya+Station&destination=Tokyo+Tower&travelmode=walking`,
  ],
  [
    "directions path",
    "https://maps.apple.com/directions?destination=Tokyo+Tower&mode=transit",
    `${GOOGLE}dir/?api=1&destination=Tokyo+Tower&travelmode=transit`,
  ],
];

for (const [name, input, expected] of appleCases) {
  test(`apple: ${name}`, () => assert.strictEqual(convertAppleMapsUrl(input), expected));
}

test("apple: landing page returns null", () => {
  assert.strictEqual(convertAppleMapsUrl("https://maps.apple.com/"), null);
});
