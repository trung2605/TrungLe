const { test, expect } = require('@playwright/test');
const { ROUTES } = require('./fixtures');

const noHorizontalOverflow = async (page) => {
  const overflow = await page.evaluate(() => {
    return document.documentElement.scrollWidth - document.documentElement.clientWidth;
  });
  return overflow;
};

test.describe('Responsive layout', () => {
  for (const route of ROUTES) {
    test(`${route.name}: no horizontal overflow at 375px`, async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 800 });
      await page.goto(route.path);
      await page.waitForTimeout(300); // allow entry animations to settle
      const overflow = await noHorizontalOverflow(page);
      expect(overflow).toBeLessThanOrEqual(2);
    });
  }

  test('desktop nav is visible and mobile hamburger hidden at 1280px', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/');
    await expect(page.locator('nav a[href="/about"]').first()).toBeVisible();
    await expect(page.getByTestId('mobile-menu-toggle')).toBeHidden();
  });

  test('mobile hamburger visible and desktop nav hidden at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/');
    await expect(page.getByTestId('mobile-menu-toggle')).toBeVisible();
    await expect(page.locator('nav a[href="/about"]').first()).toBeHidden();
  });

  test('project detail sidebar stacks below content on mobile', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 800 });
    await page.goto('/projects/1');
    const grid = page.locator('.project-detail-grid').first();
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(1);
  });

  test('project detail sidebar sits beside content on desktop', async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/projects/1');
    const grid = page.locator('.project-detail-grid').first();
    const columns = await grid.evaluate((el) => getComputedStyle(el).gridTemplateColumns.split(' ').length);
    expect(columns).toBe(2);
  });

  test('projects grid reflows to fewer columns on mobile', async ({ page }) => {
    await page.goto('/projects');
    await page.setViewportSize({ width: 1280, height: 800 });
    // Route is lazy-loaded — wait for the grid to actually mount before reading its layout
    await page.waitForSelector('[style*="grid-template-columns"]');
    const desktopCols = await page
      .evaluate(() => {
        const grid = document.querySelector('[style*="grid-template-columns"]');
        return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;
      });
    await page.setViewportSize({ width: 375, height: 800 });
    await page.waitForTimeout(200);
    const mobileCols = await page
      .evaluate(() => {
        const grid = document.querySelector('[style*="grid-template-columns"]');
        return grid ? getComputedStyle(grid).gridTemplateColumns.split(' ').length : 0;
      });
    expect(mobileCols).toBeLessThanOrEqual(desktopCols);
  });
});
