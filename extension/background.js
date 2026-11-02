// Content scripts can't read cross-origin redirects, so short links are resolved here.

browser.runtime.onMessage.addListener(async (message) => {
  if (!message.resolve) return null;
  try {
    const response = await fetch(message.resolve, { redirect: "follow" });
    return response.url;
  } catch {
    return null;
  }
});
