const { test, expect } = require('@playwright/test');
const { ROUTES } = require('./fixtures');

test.describe('Navigation & routing', () => {
  for (const route of ROUTES) {
    test(`${route.path || '/'} loads with header and footer`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.locator('nav').first()).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }

  test('unknown project id shows not-found state', async ({ page }) => {
    await page.goto('/projects/does-not-exist');
    await expect(page.getByText('Back to Projects')).toBeVisible();
  });

  test('logo click navigates home', async ({ page }) => {
    await page.goto('/about');
    await page.locator('nav a[href="/"]').first().click();
    await expect(page).toHaveURL('/');
  });

  test('desktop nav links navigate to each route', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    // /certificates has no standalone nav link (merged into Education & Certificates)
    for (const route of ROUTES.filter((r) => r.path !== '/' && r.path !== '/certificates')) {
      await page.locator(`nav a[href="${route.path}"]`).first().click();
      await expect(page).toHaveURL(route.path);
    }
  });

  test('mobile hamburger opens and closes menu', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    const toggle = page.getByTestId('mobile-menu-toggle');
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
    await toggle.click();
    await expect(page.getByTestId('mobile-menu')).toBeVisible();
    await toggle.click();
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
  });

  test('mobile menu link navigates and auto-closes', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await page.getByTestId('mobile-menu-toggle').click();
    await page.getByTestId('mobile-menu').getByRole('link', { name: /Contact|Liên hệ/i }).click();
    await expect(page).toHaveURL('/contact');
    await expect(page.getByTestId('mobile-menu')).toBeHidden();
  });

  test('scroll-to-top button appears after scrolling and returns to top', async ({ page }) => {
    await page.goto('/projects');
    await page.mouse.wheel(0, 1200);
    const scrollTopBtn = page.locator('footer button, [aria-label*="top" i], [aria-label*="Top" i]').last();
    await expect(scrollTopBtn).toBeVisible();
    await scrollTopBtn.click();
    // Lenis smooth-scroll (see App.js) eases over ~1.1s, so allow more time than a native jump
    await expect
      .poll(() => page.evaluate(() => window.scrollY), { timeout: 5000 })
      .toBeLessThan(100);
  });
});
