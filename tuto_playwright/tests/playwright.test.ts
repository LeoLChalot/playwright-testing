import { test, expect } from '@playwright/test';

test('has title', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Expect a title "to contain" a substring.
    // await page.pause();
    await expect(page).toHaveTitle(/Playwright/);
});

test('(Long Syntaxe) Get Started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    const getStarted = page.getByRole('link', { name: 'Get Started' });
    await getStarted.click();
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});

// Same test as above but with shorter syntax
test('(Short Syntaxe) Get Started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    await page.click('text=Get Started');
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});

// Same test as below but with locator syntax
test('(Locator) Get Started link', async ({ page }) => {
    // Go to the starting url
    await page.goto('https://playwright.dev/');

    // Get the get started link element
    const getStarted = page.locator('text=Get Started');

    // Check if the get started element has an href
    await expect(getStarted).toHaveAttribute('href', '/docs/intro');

    // Click the get started link
    await getStarted.click();

    // Expects the aims URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);

    // Expect the text "Introduction" to be visible
    await expect(page.locator('text=Introduction').first()).toBeVisible();
});