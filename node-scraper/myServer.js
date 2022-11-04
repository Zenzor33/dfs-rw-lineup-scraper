// // https://www.rotowire.com/basketball/nba-lineups.php

const http = require("http");
const port = 3005;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World");
});

server.listen(port, () => {
  console.log(`Server running at PORT:${port}/`);
});

const axios = require("axios");

axios
  .get("https://www.rotowire.com/basketball/nba-lineups.php")
  .then((response) => {
    console.log(response);
  })
  .catch((error) => {
    console.error(error);
  });

// const { JSDOM } = require("jsdom");

// const HTML = `
// 	<html>
// 		<body>
// 			<button onclick="const e = document.createElement('div'); e.id = 'myid'; this.parentNode.appendChild(e);">Click me</button>
// 		</body>
// 	</html>`;

// const dom = new JSDOM(HTML, {
//   runScripts: "dangerously",
//   resources: "usable",
// });

// const document = dom.window.document;

// const button = document.querySelector("button");

// console.log("Element before click: " + document.querySelector("div#myid"));
// button.click();
// console.log("Element after click: " + document.querySelector("div#myid"));
// <h2 class="title welcome">Hello there!</h2>

// const puppeteer = require("puppeteer");

// async function getVisual() {
//   try {
//     const URL = "https://www.reddit.com/r/programming/";
//     const browser = await puppeteer.launch();

//     const page = await browser.newPage();
//     await page.goto(URL);

//     await page.screenshot({ path: "screenshot.png" });
//     await page.pdf({ path: "page.pdf" });

//     await browser.close();
//   } catch (error) {
//     console.error(error);
//   }
// }

// getVisual();

// const Nightmare = require("nightmare");
// const nightmare = Nightmare();

// nightmare
//   .goto("https://search.brave.com/")
//   .type("#searchbox", "ScrapingBee")
//   .click("#submit-button")
//   .wait("#results a")
//   .evaluate(() => document.querySelector("#results a").href)
//   .end()
//   .then((link) => {
//     console.log("ScrapingBee Web Link:", link);
//   })
//   .catch((error) => {
//     console.error("Search failed:", error);
//   });

const playwright = require("playwright");
async function main() {
  const browser = await playwright.chromium.launch({
    headless: false, // setting this to true will not run the UI
  });

  const page = await browser.newPage();
  await page.goto("https://www.rotowire.com/basketball/nba-lineups.php");
  await page.waitForTimeout(5000); // wait for 5 seconds
  await browser.close();
}

main();
