import { test, expect } from '@playwright/test';


test.describe('Wikipedia', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.wikipedia.org/');
        await page.locator('strong:has-text("Français")').click();
    })

    test('Go to "Manu Chao"', async ({ page }) => {
        await page.locator('[placeholder="Rechercher sur Wikipédia"]').click();
        await page.getByPlaceholder('Rechercher sur Wikipédia').click();
        await page.keyboard.type('Manu Chao');
        await page.keyboard.press('Enter');
        await expect(page).toHaveTitle(/Manu Chao/);
    });

    test('Go to "Raton Laveur"', async ({ page }) => {
        await page.locator('[placeholder="Rechercher sur Wikipédia"]').click();
        await page.getByPlaceholder('Rechercher sur Wikipédia').click();
        await page.keyboard.type('Raton laveur');
        await page.pause();
        await page.keyboard.press('Enter');
        await expect(page).toHaveTitle(/Raton laveur/);
    });

    test('Article au hasard"', async ({ page }) => {
        await page.getByLabel('Menu principal').check();
        await page.pause();
        await page.getByRole('link', { name: 'Article au hasard' }).click();
        await expect(page).toHaveURL(/https:\/\/fr\.wikipedia\.org\/wiki\/.*/);
    });
})

