// Redirects maps links to the user's default maps app as soon as the page starts loading.

const SHORT_LINK_HOSTS = ["maps.app.goo.gl", "goo.gl"];

async function countConversion() {
  const { conversionCount = 0 } = await browser.storage.local.get("conversionCount");
  await browser.storage.local.set({ conversionCount: conversionCount + 1 });
}

async function redirectToDefaultApp() {
  const { defaultApp = "apple" } = await browser.storage.local.get("defaultApp");
  const onApple = location.hostname === "maps.apple.com";
  // Only convert links that point at the app the user did not pick.
  if (defaultApp === "off" || onApple === (defaultApp === "apple")) return;

  let target = location.href;
  if (SHORT_LINK_HOSTS.includes(location.hostname)) {
    // Short links hide the real destination behind a redirect.
    target = await browser.runtime.sendMessage({ resolve: location.href });
  }
  if (!target) return;

  const converted = onApple ? convertAppleMapsUrl(target) : convertGoogleMapsUrl(target);
  if (!converted) return;
  await countConversion();
  location.replace(converted);
}

redirectToDefaultApp();
