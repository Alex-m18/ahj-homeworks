import puppetteer from 'puppeteer';

// jest.setTimeout(15000);
jest.setTimeout(3000);
describe('card validator widget', () => {
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

  test('should get valid', async () => {
    await page.goto(baseUrl);
    // const widget = await page.$('.card_validator_widget');
    const input = await page.$('.card_validator_widget .card_input');
    await input.type('4276550011117820');
    const submit = await page.$('.card_validator_widget .validate_button');
    submit.click();
    await page.waitForSelector('.result_img.valid');
    await input.type('');
    await input.type('4276550011117821');
    submit.click();
    await page.waitForSelector('.result_img.invalid');
  });
});
