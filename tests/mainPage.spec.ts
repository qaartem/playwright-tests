import { test, expect, Page, Locator } from '@playwright/test';

interface Elements {
  locator: (page: Page) => Locator;
  name: string;
  text?: string;
  attribute?: {
    type: string;
    value: string;
  };
}

const elements: Elements[] = [
  {
    locator: (page: Page): Locator =>
      page.getByRole('link', { name: 'Playwright logo Playwright' }),
    name: 'Playwright logo',
    text: 'Playwright',
    attribute: { type: 'href', value: '/' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Docs' }),
    name: 'Docs link',
    text: 'Docs',
    attribute: { type: 'href', value: '/docs/intro' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'MCP', exact: true }),
    name: 'MCP link',
    text: 'MCP',
    attribute: { type: 'href', value: '/mcp/introduction' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'CLI', exact: true }),
    name: 'CLI link',
    text: 'CLI',
    attribute: { type: 'href', value: '/agent-cli/introduction' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'API' }),
    name: 'API link',
    text: 'API',
    attribute: { type: 'href', value: '/docs/api/class-playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Node.js' }),
    name: 'Node.js button',
    text: 'Node.js',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'GitHub repository' }),
    name: 'GitHub repository link',
    text: '',
    attribute: { type: 'href', value: 'https://github.com/microsoft/playwright' },
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Discord server' }),
    name: 'Discord server link',
    text: '',
    attribute: { type: 'href', value: 'https://aka.ms/playwright/discord' },
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('button', { name: 'Switch between dark and light' }),
    name: 'Switch between dark and light button',
    text: '',
  },
  {
    locator: (page: Page): Locator => page.getByRole('button', { name: 'Search' }),
    name: 'Search input',
    text: '',
  },
  {
    locator: (page: Page): Locator =>
      page.getByRole('heading', { name: 'Playwright enables reliable' }),
    name: 'Playwright heading',
    text: 'Playwright enables reliable web automation for testing, scripting, and AI agents.',
  },
  {
    locator: (page: Page): Locator => page.getByRole('link', { name: 'Get started' }),
    name: 'Get started link',
    text: 'Get started',
    attribute: { type: 'href', value: '/docs/intro' },
  },
];

test.describe('Main page tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://playwright.dev/');
  });

  test('Check visibility of elements of header navigation ', async ({ page }) => {
    elements.forEach(({ locator, name }) => {
      test.step(`Check visibility of ${name}`, async () => {
        await expect.soft(locator(page)).toBeVisible();
      });
    });
  });

  test('Check names of elements of header navigation ', async ({ page }) => {
    elements.forEach(({ locator, name, text }) => {
      if (text) {
        test.step(`Check name of elements: ${name}`, async () => {
          await expect.soft(locator(page)).toContainText(text);
        });
      }
    });
  });

  test('Check attributes href elements of header navigation ', async ({ page }) => {
    elements.forEach(({ locator, name, attribute }) => {
      if (attribute) {
        test.step(`Check attributes href of elements: ${name}`, async () => {
          await expect.soft(locator(page)).toHaveAttribute(attribute?.type, attribute?.value);
        });
      }
    });
  });

  test('Check functionality of light mode', async ({ page }) => {
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'light');
    await page.getByLabel('Switch between dark and light').click();
    await expect.soft(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  });

  ['light', 'dark'].forEach((value) => {
    test(`Check styles of active ${value} mode`, async ({ page }) => {
      await page.evaluate((theme) => {
        document.documentElement.setAttribute('data-theme', theme);
      }, value);
      await expect(page).toHaveScreenshot(`page-with-${value}-mode.png`);
    });
  });
});
