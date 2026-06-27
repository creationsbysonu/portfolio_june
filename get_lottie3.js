import { launch } from 'chrome-launcher';
import puppeteer from 'puppeteer-core';

(async () => {
  const chrome = await launch({chromeFlags: ['--headless']});
  const browser = await puppeteer.connect({
    browserURL: `http://127.0.0.1:${chrome.port}`
  });
  const page = await browser.newPage();
  
  await page.goto('https://lordicon.com/icons?query=microphone');
  await new Promise(r => setTimeout(r, 3000));
  let icons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('lord-icon')).map(i => i.getAttribute('src'));
  });
  console.log("Microphone URLs:", icons.filter(u => u && u.includes('cdn.lordicon.com')).slice(0, 3));

  await page.goto('https://lordicon.com/icons?query=cart');
  await new Promise(r => setTimeout(r, 3000));
  icons = await page.evaluate(() => {
    return Array.from(document.querySelectorAll('lord-icon')).map(i => i.getAttribute('src'));
  });
  console.log("Cart URLs:", icons.filter(u => u && u.includes('cdn.lordicon.com')).slice(0, 3));

  await browser.close();
  await chrome.kill();
})();
