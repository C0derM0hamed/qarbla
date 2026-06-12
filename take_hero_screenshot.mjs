import puppeteer from 'puppeteer-core';

async function capture() {
  const browser = await puppeteer.launch({
    executablePath: '/usr/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  // Listen for console logs and errors
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.error('BROWSER ERROR:', err.message));

  await page.setViewport({ width: 1200, height: 800, deviceScaleFactor: 2 });
  
  try {
    console.log("Navigating to home page...");
    await page.goto('http://localhost:3000/karbala', { waitUntil: 'networkidle2', timeout: 30000 });
    await new Promise(r => setTimeout(r, 3000));
    await page.screenshot({ path: '/home/mohamedmostafa/Desktop/qarbla/hero_fixed.png' });
    console.log("Screenshot saved.");
  } catch (e) {
    console.error("Error capturing: ", e);
  } finally {
    await browser.close();
  }
}

capture();
