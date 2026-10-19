import { test, expect } from '@playwright/test';

test.describe('PWA offline fallback', () => {
  test.use({ baseURL: 'http://127.0.0.1:4174', serviceWorkers: 'allow' });

  test('service worker app shell va offline sahifasini keshdan beradi', async ({ page, context }) => {
    await page.goto('/basics/jsWhat');

    await page.waitForFunction(async () => {
      if (!('serviceWorker' in navigator)) return false;
      const registration = await navigator.serviceWorker.ready;
      return Boolean(registration.active);
    }, null, { timeout: 30_000 });

    await page.reload();
    await page.waitForFunction(() => Boolean(navigator.serviceWorker.controller), null, {
      timeout: 30_000,
    });

    await expect(page.getByRole('navigation', { name: 'Darslar navigatsiyasi' })).toBeVisible();
    await expect(page.locator('.theory-container')).toBeVisible();

    await context.setOffline(true);

    await page.reload({ waitUntil: 'domcontentloaded' });
    await expect(page.getByRole('navigation', { name: 'Darslar navigatsiyasi' })).toBeVisible({
      timeout: 15_000,
    });
    await expect(page.locator('.theory-container')).toBeVisible({ timeout: 15_000 });

    await page.goto('/offline.html');
    await expect(page.getByRole('heading', { name: 'Siz oflaynsiz' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Qayta urinish' })).toBeVisible();

    await context.setOffline(false);
  });
});
