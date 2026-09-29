const { chromium } = require('playwright');
const path = require('path');

async function captureDark() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  
  // Set dark mode before navigation
  await context.addInitScript(() => {
    localStorage.setItem('theme-mode', 'true');
    document.documentElement.classList.add('dark');
  });

  const page = await context.newPage();
  console.log('Navigating to http://localhost:3000/dich-vu in Dark Mode ...');
  await page.goto('http://localhost:3000/dich-vu', { waitUntil: 'networkidle', timeout: 30000 });
  await page.waitForTimeout(1500);

  const heroDark = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-hero-dark.png');
  await page.screenshot({ path: heroDark, fullPage: false });
  console.log('Captured Dark Mode Hero screenshot:', heroDark);

  const simLocator = page.locator('.hero-tech-simulator-card');
  await simLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const simDark = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-sim-dark.png');
  await page.screenshot({ path: simDark, fullPage: false });
  console.log('Captured Dark Mode Simulator screenshot:', simDark);

  const stackLocator = page.locator('.synap-tech-stack-section');
  await stackLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const stackDark = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-stack-dark.png');
  await page.screenshot({ path: stackDark, fullPage: false });
  console.log('Captured Dark Mode Stack screenshot:', stackDark);

  await browser.close();
  console.log('Done capturing Dark Mode screenshots!');
}

captureDark().catch(err => {
  console.error('Capture error:', err.message);
  process.exit(1);
});
