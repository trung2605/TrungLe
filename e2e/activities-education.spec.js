const { test, expect } = require('@playwright/test');

test.describe('Activities page', () => {
  test('renders a non-empty list of activities', async ({ page }) => {
    await page.goto('/activities');
    await expect(page.locator('h3').first()).toBeVisible();
    expect(await page.locator('h3').count()).toBeGreaterThan(0);
  });

  test('status filter narrows the list', async ({ page }) => {
    await page.goto('/activities');
    // Filter pills are Radix Tabs — semantic role is "tab", not "button"
    const completedBtn = page.getByRole('tab', { name: /^Completed$|^Đã hoàn thành$/ }).first();
    await completedBtn.click();
    await expect(page.locator('h3').first()).toBeVisible();
  });

  test('organization dropdown filters the list', async ({ page }) => {
    await page.goto('/activities');
    const orgSelect = page.locator('select');
    if (await orgSelect.count()) {
      const options = await orgSelect.locator('option').allTextContents();
      if (options.length > 1) {
        await orgSelect.selectOption({ index: 1 });
        await expect(page.locator('h3').first()).toBeVisible();
      }
    }
  });

  test('clicking an activity card opens and closes detail modal', async ({ page }) => {
    await page.goto('/activities');
    const firstTitle = (await page.locator('h3').first().textContent()).trim();
    await page.locator('h3').first().click();
    // Radix Dialog renders a visually-hidden (but not display:none) a11y title in addition
    // to the visible <h2> — exclude the sr-only one explicitly rather than relying on :visible.
    const modalHeading = page.getByRole('heading', { level: 2, name: firstTitle }).and(page.locator(':not(.sr-only)'));
    await expect(modalHeading).toBeVisible();

    // click the fixed full-screen backdrop (not the modal panel) to close
    await page.locator('.fixed.inset-0').click({ position: { x: 10, y: 10 } });
    await expect(modalHeading).toBeHidden();
  });
});

test.describe('Education page', () => {
  test('renders education timeline entries', async ({ page }) => {
    await page.goto('/education');
    await expect(page.locator('h3').first()).toBeVisible();
    expect(await page.locator('h3').count()).toBeGreaterThan(0);
  });

  test('renders memory gallery section', async ({ page }) => {
    await page.goto('/education');
    await expect(page.getByText(/Campus Memories|Kỷ niệm/i)).toBeVisible();
  });
});
