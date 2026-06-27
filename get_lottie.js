import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

(async () => {
  const chrome = await launch({chromeFlags: ['--headless']});
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`
  });
  const page = await browser.newPage();
  
  // Search for microphone
  await page.goto('https://lordicon.com/icons?query=microphone');
  await page.waitForSelector('lord-icon');
  const micSrc = await page.evaluate(() => document.querySelector('lord-icon').getAttribute('src'));
  console.log("Microphone URL:", micSrc);

  // Search for cart
  await page.goto('https://lordicon.com/icons?query=cart');
  await page.waitForSelector('lord-icon');
  const cartSrc = await page.evaluate(() => document.querySelector('lord-icon').getAttribute('src'));
  console.log("Cart URL:", cartSrc);

  await browser.close();
  await chrome.kill();
})();
