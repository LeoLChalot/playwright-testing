# Prise en main de Playwright

## Installation

Commencer par créer un espace de travail

```bash
mkdir playwright # Création du dossier de travail
cd playwright # Accès au dossier
npm init playwright@latest # Initialisation et création de package.json
npm add -D @playwright/test # Maj de la dépendance
npx playwright install # Installation de la dépendance
```

## Création de tests

Dans le dossier de travail, il faut créer un dossier `test`, puis un dossier `*.test.js`.

Un test se rédige sous la forme suivante

```typescript
import { modules } from 'package'

test('nomDuTest', async({ page }) => {
  (await) page.test.a(executer);
  (await) expect(page).contientLeResultat(/Resultat/);
})
```

### Par exemple

```typescript
// Vérification d'URL
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await expect(page).toHaveTitle(/Playwright/);
});
```

- Ici le test consiste à vérifier si le `titre` récupéré depuis l'adresse **`https://playwright.dev/`** contient la chaîne de caractères (ou la RegEx) `Playwright`.

```typescript
// Vérification du click sur un lien
import { test, expect } from '@playwright/test';

test('(Long Syntaxe) Get Started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // Click the get started link.
    const getStarted = page.getByRole('link', { name: 'Get Started' });
    await getStarted.click();
    // Expects the URL to contain intro.
    await expect(page).toHaveURL(/.*intro/);
});
```

La syntaxe utilisé ci dessus peut être raccourcie de la façon suivante

```typescript
// Vérification du click sur un lien
import { test, expect } from '@playwright/test';

test('(Short Syntaxe) Get Started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    await page.click('text=Get Started');
    await expect(page).toHaveURL(/.*intro/);
});
```

L'utilisation de `Locator` peut aussi être utilisé. Le `Locator` permet le ciblage par `sélecteur CSS` ou par `contenu "text"`

```typescript
// Vérification du click sur un lien
import { test, expect } from '@playwright/test';

test('(Locator) Get Started link', async ({ page }) => {
    await page.goto('https://playwright.dev/');
    // The locator aims the "Get Started link"
    const getStarted = page.locator('text=Get Started').first();
    await getStarted.click();
    await expect(page).toHaveURL(/.*intro/);
});
```

- Ici le test consiste à :
  - se rendre à l'adresse `https://playwright.dev/`,
  - récupérer le premier élément qui contient la chaîne de caractères "Get Started",
  - cliquer sur cet élément,
  - vérifier que l'URL de destination se termine par `intro`

```typescript
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
```

- Ici le test consiste à :
  - se rendre à l'adresse `https://playwright.dev/`,
  - récupérer le premier élément qui contient la chaîne de caractères "Get Started",
  - vérifier que celui ci possède l'attribut `href` défini sur `/docs/intro`
  - cliquer sur cet élément,
  - vérifier que l'URL de destination se termine par `intro`,
  - vérifier que le texte "Introduction" soit visible.

## Exécution des tests

- `playwright test` : exécution des tests.

```bash
$ npm test

> tuto_playwright@1.0.0 test
> npx playwright test


Running 4 tests using 1 worker

  ✓  1 tests\playwright.test.ts:3:5 › has title (654ms)
  ✓  2 tests\playwright.test.ts:10:5 › (Long Syntaxe) Get Started link (533ms)
  ✓  3 tests\playwright.test.ts:20:5 › (Short Syntaxe) Get Started link (574ms)
  ✓  4 tests\playwright.test.ts:29:5 › (Locator) Get Started link (639ms)

  4 passed (3.4s)
```

Le flag `--headed` peut être rajouté pour lancer le test visuel (ouverture du navigateur, puis tests)

L'utilisation d'un script de test peut être spécifié dans le fichier `package.json`

```json
// package.json
"scripts": {
    "test": "npx playwright test"
  },
```
