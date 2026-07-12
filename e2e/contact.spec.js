const { test, expect } = require('@playwright/test');
const { mockEmailJsSuccess, mockEmailJsFailure } = require('./fixtures');

test.describe('Contact form', () => {
  test('submitting empty required fields shows required-field error', async ({ page }) => {
    await page.goto('/contact');
    // name/email/message are native `required`; force a submit attempt via JS to hit app-level validation too
    await page.getByTestId('contact-name').fill('');
    await page.getByTestId('contact-email').fill('not-an-email');
    await page.getByTestId('contact-message').fill('hello');
    await page.getByTestId('contact-submit').click();
    // native HTML validation blocks submit on empty required "name" field
    const nameValidity = await page.getByTestId('contact-name').evaluate((el) => el.validity.valid);
    expect(nameValidity).toBe(false);
  });

  test('invalid email format shows error message', async ({ page }) => {
    await page.goto('/contact');
    await page.getByTestId('contact-name').fill('Test User');
    // passes native type=email validation (has @ and a domain) but fails the app's stricter regex (no dot after @)
    await page.getByTestId('contact-email').fill('test@localhost');
    await page.getByTestId('contact-message').fill('Hello there, this is a test message.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('contact-status-error')).toBeVisible({ timeout: 5000 });
  });

  test('valid submission (mocked EmailJS success) shows success message and clears form', async ({ page }) => {
    await mockEmailJsSuccess(page);
    await page.goto('/contact');
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-subject').fill('Hello');
    await page.getByTestId('contact-message').fill('This is a valid test message.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('contact-status-success')).toBeVisible({ timeout: 5000 });
    await expect(page.getByTestId('contact-name')).toHaveValue('');
  });

  test('failed submission (mocked EmailJS 500) shows error message', async ({ page }) => {
    await mockEmailJsFailure(page);
    await page.goto('/contact');
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-message').fill('This message should fail to send.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('contact-status-error')).toBeVisible({ timeout: 5000 });
  });

  test('submit button shows submitting state while in flight', async ({ page }) => {
    await page.route('**/api.emailjs.com/**', async (route) => {
      await new Promise((r) => setTimeout(r, 800));
      await route.fulfill({ status: 200, body: 'OK' });
    });
    await page.goto('/contact');
    await page.getByTestId('contact-name').fill('Test User');
    await page.getByTestId('contact-email').fill('test@example.com');
    await page.getByTestId('contact-message').fill('Checking the submitting state.');
    await page.getByTestId('contact-submit').click();
    await expect(page.getByTestId('contact-submit')).toBeDisabled();
  });
});
