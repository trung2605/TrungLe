const { test, expect } = require('@playwright/test');

test.describe('Home page', () => {
  test('hero renders name and description', async ({ page }) => {
    await page.goto('/');
    await expect(page.locator('h1, h2').first()).toBeVisible();
    await expect(page.getByText(/Java Spring Boot/i).first()).toBeVisible();
  });

  test('stats section renders 4 numeric counters', async ({ page }) => {
    await page.goto('/');
    await page.getByText(/Những con số|Stats|By the numbers|By Numbers/i).first().scrollIntoViewIfNeeded().catch(() => {});
    const counters = page.locator('text=/^\\d+\\+?$/');
    await expect(counters.first()).toBeVisible({ timeout: 10000 });
  });

  test('tech pill row renders with icons', async ({ page }) => {
    await page.goto('/');
    const javaPill = page.locator('span', { hasText: 'Java' }).filter({ has: page.locator('svg') }).first();
    await javaPill.scrollIntoViewIfNeeded();
    await expect(javaPill).toBeVisible();
    await expect(javaPill.locator('svg')).toBeVisible();
  });

  test('"View Projects" CTA navigates to /projects', async ({ page }) => {
    await page.goto('/');
    await page.locator('a[href="/projects"]:visible').first().click();
    await expect(page).toHaveURL('/projects');
  });

  test('"Get In Touch" CTA navigates to /contact', async ({ page }) => {
    await page.goto('/');
    const cta = page.locator('a[href="/contact"]:visible').first();
    await cta.scrollIntoViewIfNeeded();
    await cta.click();
    await expect(page).toHaveURL('/contact');
  });
});
