import { test, expect } from '@playwright/test';

test('has basic UI elements', async ({ page }) => {
  await page.goto('/');

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Mockdata Ai/i);

  // Expect the main heading to be visible
  await expect(page.getByRole('heading', { name: 'MockData AI' })).toBeVisible();

  // Expect the generate button to be present
  const generateButton = page.getByRole('button', { name: 'Generate Data' });
  await expect(generateButton).toBeVisible();
});
