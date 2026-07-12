const { test, expect } = require('@playwright/test');
const { setLang } = require('./fixtures');

test.describe('Language toggle (EN/VI)', () => {
  test('defaults to English on first visit', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('About');
  });

  test('toggle switches EN -> VI and persists to localStorage', async ({ page }) => {
    await page.goto('/');
    await page.getByTestId('lang-toggle').click();
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('Giới thiệu');
    const stored = await page.evaluate(() => window.localStorage.getItem('lang'));
    expect(stored).toBe('vi');
  });

  test('language choice persists across reload and navigation', async ({ page }) => {
    await setLang(page, 'vi');
    await page.goto('/');
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('Giới thiệu');
    await page.goto('/projects');
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('Giới thiệu');
    await page.reload();
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('Giới thiệu');
  });

  test('toggling back to EN restores English strings', async ({ page }) => {
    await setLang(page, 'vi');
    await page.goto('/');
    await page.getByTestId('lang-toggle').click();
    await expect(page.locator('nav a[href="/about"]').first()).toHaveText('About');
    const stored = await page.evaluate(() => window.localStorage.getItem('lang'));
    expect(stored).toBe('en');
  });

  test('Vietnamese strings render on Projects and Contact pages', async ({ page }) => {
    await setLang(page, 'vi');
    await page.goto('/projects');
    await expect(page.getByTestId('project-filter-all')).toContainText('Tất cả');

    await page.goto('/contact');
    await expect(page.getByTestId('contact-submit')).toContainText('Gửi tin nhắn');
  });
});
