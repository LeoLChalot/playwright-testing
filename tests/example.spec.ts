import { test, expect, Locator } from '@playwright/test';

import dotenv from 'dotenv';
dotenv.config();

const loginPage: string = process.env.loginPage!;
const dashboardPage: string = process.env.dashboardPage!;
const settingsPage: string = process.env.settingsPage!;
const messagesPage: string = process.env.messagesPage!;
const email: string = process.env.email!;
const pass: string = process.env.pass!;

// Exécute tous les tests en parallele
// test.describe.configure({ mode: 'parallel' });

test.describe('Navigate', () => {
  test.beforeEach("Login", async ({ page }) => {
    // Accéder à la page de login
    await page.goto(loginPage);
    await expect(page).toHaveURL(loginPage);

    // Remplir les champs
    const emailField: Locator = await page.getByPlaceholder('monemail@exemple.com')
    await emailField.fill(email)

    await page.getByPlaceholder('********').fill(pass)

    // Cliquer sur le bouton
    const loginButton: Locator = await page.getByRole('button', { name: 'Me connecter' })
    await loginButton.click()

    // Redirection
    await expect(page).toHaveURL(dashboardPage)
  });

  test('Go to Messages', async ({ page }) => {
    const messagesLink: Locator = await page.getByRole('link', { name: 'Messages' })
    await messagesLink.click()
    await expect(page).toHaveURL(messagesPage)
  })

  test('Go to Settings', async ({ page }) => {
    const settingsLink: Locator = await page.getByRole('link', { name: 'Paramètres' })
    await settingsLink.click()
    await expect(page).toHaveURL(settingsPage)
  })

  test.afterEach("Logout", async ({ page }) => {
    const settingsLink: Locator = await page.getByRole('link', { name: 'Paramètres' })
    await settingsLink.click()
    await expect(page).toHaveURL(settingsPage)

    const logoutButton: Locator = await page.getByRole('button', { name: 'Déconnexion' })
    await logoutButton.click()

    const logoutLink: Locator = await page.getByRole('link', { name: 'Déconnexion' })
    await logoutLink.click()

    await expect(page).toHaveURL(loginPage)
  })
});

test.describe('Without Logs', () => {

  // Unable to reach the Dashboard page (specified with the .fail() method)
  test.fail('Go to Dashboard', async ({ page }) => {
    await page.goto(dashboardPage)
    await expect(page).toHaveURL(dashboardPage)
  })

  test.fail('Go to Messages', async ({ page }) => {
    await page.goto(messagesPage)
    await expect(page).toHaveURL(messagesPage)
  })

  test.fail('Go to Settings', async ({ page }) => {
    await page.goto(settingsPage)
    await expect(page).toHaveURL(settingsPage)
  })

})






