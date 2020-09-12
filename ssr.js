const puppeteer = require('puppeteer');
const fs = require('fs')

async function ssr() {

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.goto('http://localhost:8080', {waitUntil: 'networkidle0'});
    await page.waitForSelector('.calendar__1OpEE')
  } catch (err) {
    console.error(err);
    throw new Error('page.goto/waitForSelector timed out.');
  }

  const html = await page.content();
  fs.appendFile(`${__dirname}/docs/index.html`, html, (e) => console.log(e));
  await browser.close();
}

ssr()