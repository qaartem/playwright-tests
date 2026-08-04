import { test, expect } from '../fixtures/mainPage';
import { MainPage } from '../models/MainPage';

test.describe('Main page tests', () => {
  test('Check visibility of elements of header navigation ', async ({ mainPage }) => {
    await mainPage.checkElementsVisibility();
  });

  test('Check names of elements of header navigation ', async ({ mainPage }) => {
    await mainPage.checkElementText();
  });

  test('Check attributes href elements of header navigation ', async ({ mainPage }) => {
    await mainPage.checkElementHrefAttribute();
  });

  test('Check functionality of light mode', async ({ mainPage }) => {
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

  test(`Check styles of active light mode`, async ({ mainPage }) => {
    await test.step(`Set light mode`, async () => {
      await mainPage.setLightMode();
    });
    await test.step(`Check light mode`, async () => {
      await mainPage.checkLayoutWithLightMode();
    });
  });

  test(`Check styles of active dark mode`, async ({ mainPage }) => {
    await test.step(`Set dark mode`, async () => {
      await mainPage.setDarkMode();
    });
    await test.step(`Check dark mode`, async () => {
      await mainPage.checkLayoutWithDarkMode();
    });
  });
});
