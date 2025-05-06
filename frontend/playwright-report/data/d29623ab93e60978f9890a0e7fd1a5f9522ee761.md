# Test info

- Name: User registration to order flow >> login
- Location: C:\WebDevelopement\react-project\frontend\tests\authFlow.spec.js:32:3

# Error details

```
Error: locator.click: Test timeout of 30000ms exceeded.
Call log:
  - waiting for getByRole('heading', { name: 'Tervetuloa kotilaatikkoon!' })

    at C:\WebDevelopement\react-project\frontend\tests\authFlow.spec.js:45:8
```

# Page snapshot

```yaml
- banner:
  - link "kotilaatikko.fi":
    - /url: /
  - navigation:
    - navigation:
      - list:
        - listitem:
          - link "Etusivu":
            - /url: /
        - listitem:
          - link "Kauppa":
            - /url: /shop
        - listitem:
          - link "Kirjaudu sisään":
            - /url: /login
        - listitem:
          - link "Rekisteröidy":
            - /url: /register
        - listitem:
          - button:
            - img
- main:
  - heading "Kirjaudu sisään" [level=1]
  - paragraph: Syötä sähköposti ja salasana kirjautuaksesi
  - strong: Virhe!
  - text: Väärä sähköposti tai salasana Sähköposti*
  - textbox "Sähköposti*": playwright@testdude.fi
  - text: Salasana*
  - textbox "Salasana*": salasana
  - button "Kirjaudu sisään"
- heading "Tilaa uutiskirje ja saat -10% ensimmäisestä tilauksesta!" [level=2]
- textbox "Sähköpostiosoite"
- button "Tilaa uutiskirje"
- contentinfo:
  - paragraph: ASIAKASPALVELU
  - paragraph: Yhteystiedot
  - paragraph: "Puhelin: +358 40 66 420"
  - paragraph: "Sähköposti: aspakasa@kotilaatikko.fi"
  - paragraph: "Y-tunnus: 1234567-8"
  - paragraph: © kotilaatikko.fi 2025 — Helposti ruokaa kotiovellesi!
  - link "TikTok brand logo.":
    - /url: http://tiktok.com
    - img "TikTok brand logo."
  - link "Facebook brand logo.":
    - /url: http://facebook.com
    - img "Facebook brand logo."
  - link "Instagram brand logo.":
    - /url: http://instagram.com
    - img "Instagram brand logo."
```

# Test source

```ts
   1 | import {test, expect} from '@playwright/test';
   2 |
   3 | test.describe.serial('User registration to order flow', () => {
   4 |   test('register', async ({page}) => {
   5 |     await page.goto('http://10.120.32.65/');
   6 |     await page.getByRole('img', {name: 'hero'}).click();
   7 |     await page.getByRole('link', {name: 'Rekisteröidy'}).click();
   8 |     await page.getByText('RekisteröidyTäytä alla olevat').click();
   9 |     await page.getByRole('textbox', {name: 'Etunimi*'}).fill('playwright');
  10 |     await page.getByRole('textbox', {name: 'Sukunimi*'}).fill('testdude');
  11 |     await page
  12 |       .getByRole('textbox', {name: 'Email*'})
  13 |       .fill('playwright@testdude.fi');
  14 |     await page
  15 |       .getByRole('textbox', {name: 'Salasana* (min. 6 merkkiä)'})
  16 |       .fill('salasana');
  17 |     await page.getByRole('textbox', {name: 'Puhelin*'}).fill('0321455');
  18 |     await page.getByRole('textbox', {name: 'Osoite*'}).fill('playkuja');
  19 |     await page.getByRole('textbox', {name: 'Kaupunki*'}).fill('testikaupunki');
  20 |     await page.getByRole('textbox', {name: 'Postinumero*'}).fill('008722');
  21 |
  22 |     page.once('dialog', (dialog) => {
  23 |       console.log(`Dialog message: ${dialog.message()}`);
  24 |       dialog.dismiss().catch(() => {});
  25 |     });
  26 |
  27 |     await page.getByRole('button', {name: 'Rekisteröidy'}).click();
  28 |     await page.goto('http://10.120.32.65/');
  29 |     await page.getByRole('img', {name: 'hero'}).click();
  30 |   });
  31 |
  32 |   test('login', async ({page}) => {
  33 |     await page.goto('http://10.120.32.65/');
  34 |     await page.getByRole('link', {name: 'Kirjaudu sisään'}).click();
  35 |     await page.getByText('Kirjaudu sisäänSyötä sähkö').click();
  36 |     await page.getByRole('textbox', {name: 'Sähköposti*'}).click();
  37 |     await page
  38 |       .getByRole('textbox', {name: 'Sähköposti*'})
  39 |       .fill('playwright@testdude.fi');
  40 |     await page.getByRole('textbox', {name: 'Sähköposti*'}).press('Tab');
  41 |     await page.getByRole('textbox', {name: 'Salasana*'}).fill('salasana');
  42 |     await page.getByRole('button', {name: 'Kirjaudu sisään'}).click();
  43 |     await page
  44 |       .getByRole('heading', {name: 'Tervetuloa kotilaatikkoon!'})
> 45 |       .click();
     |        ^ Error: locator.click: Test timeout of 30000ms exceeded.
  46 |   });
  47 |
  48 |   test('place order', async ({page}) => {
  49 |     await page.goto('http://10.120.32.65/');
  50 |     await page.getByRole('link', {name: 'Kirjaudu sisään'}).click();
  51 |     await page.getByRole('textbox', {name: 'Sähköposti*'}).click();
  52 |     await page
  53 |       .getByRole('textbox', {name: 'Sähköposti*'})
  54 |       .fill('playwright@testdude.fi');
  55 |     await page.getByRole('textbox', {name: 'Sähköposti*'}).press('Tab');
  56 |     await page.getByRole('textbox', {name: 'Salasana*'}).fill('salasana');
  57 |     await page.getByText('Kirjaudu sisäänSyötä sähkö').click();
  58 |     await page.getByRole('button', {name: 'Kirjaudu sisään'}).click();
  59 |     await page
  60 |       .getByRole('heading', {name: 'Tervetuloa kotilaatikkoon!'})
  61 |       .click();
  62 |     await page.getByRole('link', {name: 'Kauppa'}).click();
  63 |     await page
  64 |       .locator(
  65 |         '.flex > div > .p-6 > .flex > .bg-\\[var\\(--primary-color\\)\\]',
  66 |       )
  67 |       .first()
  68 |       .click();
  69 |     await page.getByRole('button', {name: '1'}).click();
  70 |     await page.getByRole('link', {name: 'Siirry kassalle'}).click();
  71 |     await page.getByRole('button', {name: 'Täytä tiedot'}).click();
  72 |     await page.getByRole('radio', {name: 'Dummy'}).check();
  73 |     await page.getByRole('button', {name: 'Jatka maksamaan'}).click();
  74 |     await page.getByRole('heading', {name: 'Kiitos tilauksestasi!'}).click();
  75 |     await page.getByRole('link', {name: 'Jatka ostoksia'}).click();
  76 |     await page
  77 |       .getByRole('heading', {name: 'Tee arjestasi helppoa — Tilaa'})
  78 |       .click();
  79 |   });
  80 | });
  81 |
```