import puppeteer from 'puppeteer';

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1512, height: 792 });
  await page.goto('http://localhost:5175');
  
  // Wait for React to mount
  await new Promise(r => setTimeout(r, 1000));
  
  // Scroll down
  await page.evaluate(() => {
    window.scrollTo(0, 400);
  });
  
  // Wait for scroll listener and animation frame
  await new Promise(r => setTimeout(r, 500));
  
  await page.screenshot({ path: 'screenshot.png' });
  await browser.close();
})();
