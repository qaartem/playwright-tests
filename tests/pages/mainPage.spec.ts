import { test, expect, Page, Locator } from '@playwright/test';
import { MainPage } from '../models/MainPage';

let mainPage: MainPage;

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    mainPage = new MainPage(page);
    await mainPage.openMainPage();
  });

  test('Check visibility of elements of header navigation ', async () => {
    await mainPage.checkElementsVisibility();
  });

  test('Check names of elements of header navigation ', async () => {
    await mainPage.checkElementText();
  });

  test('Check attributes href elements of header navigation ', async () => {
    await mainPage.checkElementHrefAttribute();
  });

  test('Check functionality of light mode', async () => {
    await test.step(`Set light mode`, async () => {
      await mainPage.setLightMode();
    });
    await test.step(`Check light mode`, async () => {
      await mainPage.checkLayoutWithLightMode();
    });
    await test.step(`Set dark mode`, async () => {
      await mainPage.setDarkMode();
    });
    await test.step(`Check dark mode`, async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });

  test(`Check styles of active light mode`, async () => {
    await test.step(`Set light mode`, async () => {
      await mainPage.setLightMode();
    });
    await test.step(`Check light mode`, async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Check styles of active dark mode`, async () => {
    await test.step(`Set dark mode`, async () => {
      await mainPage.setDarkMode();
    });
    await test.step(`Check dark mode`, async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
