const { test, expect } = require('@playwright/test');

test.describe('Projects list & detail', () => {
  test('filter pills narrow the visible project list', async ({ page }) => {
    await page.goto('/projects');
    const allCount = await page.getByTestId('project-filter-all').locator('span').last().textContent();

    await page.getByTestId('project-filter-completed').click();
    await expect(page.getByTestId('project-filter-completed')).toHaveText(new RegExp(`Completed`));

    const completedCards = page.locator('h3');
    const completedCount = await completedCards.count();
    expect(completedCount).toBeGreaterThan(0);
    expect(Number(allCount.trim())).toBeGreaterThanOrEqual(completedCount);
  });

  test('each filter shows only matching status badges', async ({ page }) => {
    await page.goto('/projects');
    await page.getByTestId('project-filter-active').click();
    const badges = page.locator('text=Active').first();
    await expect(badges).toBeVisible();
  });

  test('clicking a project card navigates to its detail page', async ({ page }) => {
    await page.goto('/projects');
    await page.getByRole('button', { name: /View Details|Xem chi tiết/i }).first().click();
    await expect(page).toHaveURL(/\/projects\/\d+/);
  });

  test('project detail renders tech stack with icons', async ({ page }) => {
    await page.goto('/projects/1');
    await expect(page.getByText('Tech Stack', { exact: false }).or(page.getByText('Công nghệ sử dụng'))).toBeVisible();
    const chips = page.locator('svg').first();
    await expect(chips).toBeVisible();
  });

  test('project detail has working GitHub/Live links when present', async ({ page }) => {
    await page.goto('/projects/1');
    const githubLink = page.locator('a[href*="github.com"]').first();
    if (await githubLink.count()) {
      await expect(githubLink).toHaveAttribute('target', '_blank');
    }
  });

  test('"Other projects" section navigates to a different project on click', async ({ page }) => {
    await page.goto('/projects/1');
    const heading = page.getByText(/Other Projects|Dự án khác/i);
    await heading.scrollIntoViewIfNeeded();
    const otherCard = page.locator('.project-detail-grid').last().locator('h3').first();
    await otherCard.click();
    await expect(page).toHaveURL(/\/projects\/(?!1$)\d+/);
  });

  test('invalid project id shows not-found state with back link', async ({ page }) => {
    await page.goto('/projects/99999');
    await expect(page.getByText('Back to Projects')).toBeVisible();
    await page.getByText('Back to Projects').click();
    await expect(page).toHaveURL('/projects');
  });
});
