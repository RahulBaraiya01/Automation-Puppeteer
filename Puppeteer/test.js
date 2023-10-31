const { resolve } = require("path");
const puppeteer = require("puppeteer");
const searchTermCLI =  "Volbeat";

const automation = async function () {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();

  await page.setViewport({
    width: 1600,
    height: 1000,
    deviceScaleFactor: 1,
  });

  await page.goto("https://youtube.com/");
  await page.waitForSelector("#search-input #search");
  await page.type("#search-input #search", searchTermCLI, { delay: 100 });
  await page.emulateVisionDeficiency("blurredVision");
  await page.screenshot({ path: "./screens/youtube-home-blurred.jpg" });
  await page.emulateVisionDeficiency("none");
  await page.screenshot({ path: "./screens/youtube-home.jpg" });
  await Promise.all([
    page.waitForNavigation(),
    page.click("#search-icon-legacy"),
  ]);
  await page.waitForSelector("ytd-video-renderer h3 a#video-title");
  await page.screenshot({ path: "./screens/youtube-result.jpg" });

  const firstMatch = await page.$eval(
    "ytd-video-renderer h3 a#video-title",
    (elem) => {
      return elem.innerText;
    }
  );
  console.log({ firstMatch });
  await Promise.all([
    page.waitForNavigation(),
    page.click("ytd-video-renderer h3 a#video-title"),
    new Promise((resolve) => setTimeout(resolve, 27000)),
  ]);
  await page.screenshot({ path: "./screens/first-video.jpg" });
  await page.waitForSelector("ytd-comments-header-renderer");
  const videoComments = await page.$eval(
    "ytd-comments-header-renderer h2",
    (h2) => {
      return h2.innerText;
    }
  );
  console.log({ videoComments });
  const firstSuggested = await page.$eval(
    "ytd-compact-video-renderer",
    (elem) => {
      return elem.querySelector("h3").innerText;
    }
  );
  console.log({ firstSuggested });
  await browser.close();
};

module.exports = automation;
