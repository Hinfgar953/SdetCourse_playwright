import { test, expect } from '@playwright/test';


test('test', async ({ page }) => {
  await page.goto('https://katalon-demo-cura.herokuapp.com/');
  await page.getByRole('link', { name: 'Make Appointment' }).click();
  await page.getByLabel('Username').fill(process.env.CURA_USER!);
  await page.getByLabel('Password').fill(process.env.CURA_PASSWORD!);
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByRole('heading', { name: 'Make Appointment' })).toBeVisible();
});