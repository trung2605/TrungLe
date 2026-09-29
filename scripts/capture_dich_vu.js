const { chromium } = require('playwright');
const path = require('path');

async function capture() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();

  console.log('Navigating to http://localhost:3000/dich-vu ...');
  await page.goto('http://localhost:3000/dich-vu', { waitUntil: 'networkidle', timeout: 30000 });

  // Wait 1.5s for framer-motion animations
  await page.waitForTimeout(1500);

  const heroShot = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-hero.png');
  await page.screenshot({ path: heroShot, fullPage: false });
  console.log('Captured hero screenshot:', heroShot);

  // Scroll down to simulator
  const simLocator = page.locator('.hero-tech-simulator-card');
  await simLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const simShot = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-sim.png');
  await page.screenshot({ path: simShot, fullPage: false });
  console.log('Captured simulator tab 1 screenshot:', simShot);

  // Click Tab 2: VietQR Pro
  await page.locator('.sim-tab').nth(1).click();
  await page.waitForTimeout(600);
  // Click Trigger Payment Webhook
  await page.locator('.bill-action-btn button').click();
  await page.waitForTimeout(1800);
  const vietqrShot = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-vietqr.png');
  await page.screenshot({ path: vietqrShot, fullPage: false });
  console.log('Captured VietQR simulator screenshot:', vietqrShot);

  // Click Tab 3: Redis Mutex Lock
  await page.locator('.sim-tab').nth(2).click();
  await page.waitForTimeout(600);
  // Click Run Collision Guard
  await page.locator('.redis-action-center button').click();
  await page.waitForTimeout(1600);
  const redisShot = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-redis.png');
  await page.screenshot({ path: redisShot, fullPage: false });
  console.log('Captured Redis Lock simulator screenshot:', redisShot);

  // Scroll down to tech stack section
  const stackLocator = page.locator('.synap-tech-stack-section');
  await stackLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  const stackShot = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-stack.png');
  await page.screenshot({ path: stackShot, fullPage: false });
  console.log('Captured stack screenshot:', stackShot);

  // Switch to Dark Mode
  console.log('Testing Dark Mode...');
  await page.evaluate(() => document.documentElement.classList.add('dark'));
  await page.waitForTimeout(600);
  const heroDark = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-hero-dark.png');
  await page.locator('#overview').scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.screenshot({ path: heroDark, fullPage: false });
  console.log('Captured Dark Mode Hero screenshot:', heroDark);

  await simLocator.scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  const simDark = path.join(__dirname, '..', 'public', 'branding', 'preview-dich-vu-sim-dark.png');
  await page.screenshot({ path: simDark, fullPage: false });
  console.log('Captured Dark Mode Simulator screenshot:', simDark);

  await browser.close();
  console.log('Done capturing all interactive and dark mode screenshots!');
}

capture().catch(err => {
  console.error('Capture error:', err.message);
  process.exit(1);
});
