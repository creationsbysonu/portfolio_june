import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

(async () => {
  const chrome = await launch({chromeFlags: ['--headless']});
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`
  });
  const page = await browser.newPage();
  
  await page.goto('https://lordicon.com/icons?query=speak', {waitUntil: 'networkidle2'});
  const html = await page.content();
  const matches = html.match(/https:\/\/cdn\.lordicon\.com\/[a-z0-9]+\.json/g) || [];
  
  console.log("Speak URLs:", [...new Set(matches)].slice(0, 10));

  await browser.close();
  await chrome.kill();
})();
