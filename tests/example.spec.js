// @ts-check
import { test, expect } from '@playwright/test';
// playwright.config.js is where you can uncomment the configuration
// to run local dev server before starting test
test('has title', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Expect a title "to contain" a substring.
  // had to export metadata with title in page.js for this to work
  // since I just ran npx-create-next-app
  await expect(page).toHaveTitle(/Welcome/);
});

test('get documentation link', async ({ page }) => {
  await page.goto('http://localhost:3000');

  // Click the Documentation link.
  await page.locator('a', { hasText: 'Documentation' }).click();

  // Expects page to have a heading with the name of Next.JS Docs.
  await expect(page.getByRole('heading', {name: 'Next.js Docs'})).toBeVisible();
});
