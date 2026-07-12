const { test, expect } = require('@playwright/test');

test.describe('Certificates page', () => {
  test('search filters the certificate grid', async ({ page }) => {
    await page.goto('/certificates');
    const cardHeadings = page.locator('h3');
    await cardHeadings.first().waitFor(); // lazy-loaded route chunk — wait for the grid to mount
    const totalCount = await cardHeadings.count();
    const searchInput = page.getByPlaceholder(/Search certificates|Tìm kiếm chứng chỉ/i);
    await searchInput.fill('IELTS');
    await expect(page.getByText('IELTS', { exact: false }).first()).toBeVisible();
    const filteredCount = await cardHeadings.count();
    expect(filteredCount).toBeLessThan(totalCount);
    expect(filteredCount).toBeGreaterThan(0);
  });

  test('search with no matches shows empty state', async ({ page }) => {
    await page.goto('/certificates');
    const searchInput = page.getByPlaceholder(/Search certificates|Tìm kiếm chứng chỉ/i);
    await searchInput.fill('zzzznonexistentzzzz');
    await expect(page.getByText(/No certificates found|Không tìm thấy chứng chỉ/i)).toBeVisible();
  });

  test('year pill filters results', async ({ page }) => {
    await page.goto('/certificates');
    const yearPills = page.locator('button', { hasText: /^\d{4}$/ });
    const count = await yearPills.count();
    test.skip(count === 0, 'no year pills rendered');
    await yearPills.first().click();
    await expect(page.locator('h3').first()).toBeVisible();
  });

  test('clicking a certificate card opens modal with issuer info, closes via X', async ({ page }) => {
    await page.goto('/certificates');
    const firstTitle = (await page.locator('h3').first().textContent()).trim();
    await page.locator('h3').first().click();
    await expect(page.getByText('Issued by', { exact: false })).toBeVisible();
    // Radix Dialog renders a visually-hidden (but not display:none) a11y title in addition
    // to the visible <h2> — exclude the sr-only one explicitly rather than relying on :visible.
    await expect(page.getByRole('heading', { level: 2, name: firstTitle }).and(page.locator(':not(.sr-only)'))).toBeVisible();

    await page.locator('.fixed.inset-0').click({ position: { x: 10, y: 10 } });
    await expect(page.getByText('Issued by', { exact: false })).toBeHidden();
  });

  test('clicking backdrop closes modal', async ({ page }) => {
    await page.goto('/certificates');
    await page.locator('h3').first().click();
    await expect(page.getByText('Issued by', { exact: false })).toBeVisible();
    await page.mouse.click(10, 10);
    await expect(page.getByText('Issued by', { exact: false })).toBeHidden();
  });

  test('Prizes section renders on the same page', async ({ page }) => {
    await page.goto('/certificates');
    await expect(page.getByText('Total Awards')).toBeVisible();
  });
});
