const puppeteer = require("puppeteer");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1080,
    height: 1024,
    isMobile: false,
    isLandscape: true,
    hasTouch: false,
    deviceScaleFactor: 1,
  });

  await page.setGeolocation({ latitude: 49.5, longitude: 100.0 });

  await page.goto("https://developer.chrome.com/");

  const url = await page.url();
  console.log(url);
  const content = await page.content();
  console.log(content);

  await page.screenshot({ path: "./screens/sampleImg.jpg", fullPage: true });
  await page.screenshot({
    path: "./screens/sampleImg2.jpg",
    clip: { x: 200, y: 200, width: 500, height: 500 },
    encoding: "binary",
    type: "jpeg",
  });

  await browser.close();
})();
