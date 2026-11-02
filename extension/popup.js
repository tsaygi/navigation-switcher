// Settings panel: pick the default maps app and see how many links were converted.

const SECONDS_PER_CONVERSION = 10;

const FUN_LINES = [
  [0, "Nothing yet. Waiting for a friend to send a link."],
  [1, "First one down. The switch is working."],
  [10, "Double digits. Your friends are chatty."],
  [50, "Fifty! You're basically a translator now."],
  [100, "Triple digits. Maps diplomacy at its finest."],
  [500, "Legendary. The map-link whisperer."],
];

function funLine(count) {
  const tier = FUN_LINES.filter(([min]) => count >= min).pop();
  const saved = count * SECONDS_PER_CONVERSION;
  return count ? `${tier[1]} (~${saved}s of copy-pasting saved)` : tier[1];
}

function renderChoice(defaultApp) {
  for (const button of document.querySelectorAll(".choice")) {
    button.setAttribute("aria-checked", String(button.dataset.app === defaultApp));
  }
  if (defaultApp) {
    document.getElementById("hint").textContent = "Links from the other app open here instead.";
  }
}

function animateCount(target) {
  const el = document.getElementById("count");
  const start = performance.now();
  const duration = Math.min(800, 100 + target * 20);
  function frame(now) {
    const t = Math.min(1, (now - start) / duration);
    el.textContent = Math.round(target * t);
    if (t < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

async function init() {
  const { defaultApp, conversionCount = 0 } = await browser.storage.local.get([
    "defaultApp",
    "conversionCount",
  ]);
  renderChoice(defaultApp);
  animateCount(conversionCount);
  document.getElementById("fun").textContent = funLine(conversionCount);

  for (const button of document.querySelectorAll(".choice")) {
    button.addEventListener("click", async () => {
      await browser.storage.local.set({ defaultApp: button.dataset.app });
      renderChoice(button.dataset.app);
    });
  }
}

init();
