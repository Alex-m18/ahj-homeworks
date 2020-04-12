import puppetteer from 'puppeteer';

jest.setTimeout(15000);
// jest.setTimeout(3000);
describe('popover widget', () => {
  let browser = null;
  let page = null;
  const baseUrl = 'http://localhost:8080';
  beforeAll(async () => {
    browser = await puppetteer.launch({
      // headless: false,
      // slowMo: 100,
      // devtools: true,
    });
    page = await browser.newPage();
  });
  afterAll(async () => {
    await browser.close();
  });

  test('should show popover', async () => {
    await page.goto(baseUrl);
    const input = await page.$('.test_button');
    input.click();
    await page.waitForSelector('.popover_enabled');
    input.click();
    await page.waitForSelector('.popover_disabled');
  });
});
