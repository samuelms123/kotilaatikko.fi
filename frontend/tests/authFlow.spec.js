import {test, expect} from '@playwright/test';

test.describe.serial('User registration to order flow', () => {
  test('register', async ({page}) => {
    await page.goto('http://10.120.32.65/');
    await page.getByRole('img', {name: 'hero'}).click();
    await page.getByRole('link', {name: 'Rekisteröidy'}).click();
    await page.getByText('RekisteröidyTäytä alla olevat').click();
    await page.getByRole('textbox', {name: 'Etunimi*'}).fill('playwright');
    await page.getByRole('textbox', {name: 'Sukunimi*'}).fill('testdude');
    await page
      .getByRole('textbox', {name: 'Email*'})
      .fill('playwright@testdude.fi');
    await page
      .getByRole('textbox', {name: 'Salasana* (min. 6 merkkiä)'})
      .fill('salasana');
    await page.getByRole('textbox', {name: 'Puhelin*'}).fill('0321455');
    await page.getByRole('textbox', {name: 'Osoite*'}).fill('playkuja');
    await page.getByRole('textbox', {name: 'Kaupunki*'}).fill('testikaupunki');
    await page.getByRole('textbox', {name: 'Postinumero*'}).fill('008722');

    page.once('dialog', (dialog) => {
      console.log(`Dialog message: ${dialog.message()}`);
      dialog.dismiss().catch(() => {});
    });

    await page.getByRole('button', {name: 'Rekisteröidy'}).click();
    await page.goto('http://10.120.32.65/');
    await page.getByRole('img', {name: 'hero'}).click();
  });

  test('login', async ({page}) => {
    await page.goto('http://10.120.32.65/');
    await page.getByRole('link', {name: 'Kirjaudu sisään'}).click();
    await page.getByText('Kirjaudu sisäänSyötä sähkö').click();
    await page.getByRole('textbox', {name: 'Sähköposti*'}).click();
    await page
      .getByRole('textbox', {name: 'Sähköposti*'})
      .fill('playwright@testdude.fi');
    await page.getByRole('textbox', {name: 'Sähköposti*'}).press('Tab');
    await page.getByRole('textbox', {name: 'Salasana*'}).fill('salasana');
    await page.getByRole('button', {name: 'Kirjaudu sisään'}).click();
    await page
      .getByRole('heading', {name: 'Tervetuloa kotilaatikkoon!'})
      .click();
  });

  test('place order', async ({page}) => {
    await page.goto('http://10.120.32.65/');
    await page.getByRole('link', {name: 'Kirjaudu sisään'}).click();
    await page.getByRole('textbox', {name: 'Sähköposti*'}).click();
    await page
      .getByRole('textbox', {name: 'Sähköposti*'})
      .fill('playwright@testdude.fi');
    await page.getByRole('textbox', {name: 'Sähköposti*'}).press('Tab');
    await page.getByRole('textbox', {name: 'Salasana*'}).fill('salasana');
    await page.getByText('Kirjaudu sisäänSyötä sähkö').click();
    await page.getByRole('button', {name: 'Kirjaudu sisään'}).click();
    await page
      .getByRole('heading', {name: 'Tervetuloa kotilaatikkoon!'})
      .click();
    await page.getByRole('link', {name: 'Kauppa'}).click();
    await page
      .locator(
        '.flex > div > .p-6 > .flex > .bg-\\[var\\(--primary-color\\)\\]',
      )
      .first()
      .click();
    await page.getByRole('button', {name: '1'}).click();
    await page.getByRole('link', {name: 'Siirry kassalle'}).click();
    await page.getByRole('button', {name: 'Täytä tiedot'}).click();
    await page.getByRole('radio', {name: 'Dummy'}).check();
    await page.getByRole('button', {name: 'Jatka maksamaan'}).click();
    await page.getByRole('heading', {name: 'Kiitos tilauksestasi!'}).click();
    await page.getByRole('link', {name: 'Jatka ostoksia'}).click();
    await page
      .getByRole('heading', {name: 'Tee arjestasi helppoa — Tilaa'})
      .click();
  });
});
