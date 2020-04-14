import puppetteer from 'puppeteer';

jest.setTimeout(10000);
// jest.setTimeout(3000);
describe('listEditor widget', () => {
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

  test('should add product', async () => {
    await page.goto(baseUrl);
    const addButton = await page.$('.list_editor_title .add');
    const list = await page.$('.goods');
    const nameInput = await page.$('form input[name=name]');
    const priceInput = await page.$('form input[name=price]');
    const submitButton = await page.$('form button[type=submit]');
    addButton.click();
    await page.waitForSelector('form.show');
    await submitButton.click();
    await page.waitForSelector('form input[name=name]:invalid');
    await nameInput.type('test name');
    await submitButton.click();
    await page.waitForSelector('form input[name=price]:invalid');
    await priceInput.type('-123');
    await submitButton.click();
    await page.waitForSelector('form input[name=price]:invalid');
    await priceInput.press('Backspace');
    await priceInput.press('Backspace');
    await priceInput.press('Backspace');
    await priceInput.press('Backspace');

    await priceInput.type('123');
    await submitButton.click();
    expect(await list.evaluate(
      (o) => o.lastElementChild.querySelector('.name').textContent,
    )).toBe('test name');
    expect(await list.evaluate(
      (o) => o.lastElementChild.querySelector('.price').textContent,
    )).toBe('123 ₽');

    const editButtons = await list.$$('.edit');
    editButtons[0].click();
    await page.waitForSelector('form.show');
    expect(await nameInput.evaluate(
      (o) => o.value,
    )).toBe('Mercedes S500');
    await nameInput.type('_test');
    await submitButton.click();
    expect(await list.evaluate(
      (o) => o.children[1].querySelector('.name').textContent,
    )).toBe('Mercedes S500_test');

    const deleteButtons = await list.$$('.delete');
    await deleteButtons[1].click();
    expect(await list.evaluate(
      (o) => o.children.length,
    )).toBe(3);
    expect(await list.evaluate(
      (o) => o.children[2].querySelector('.name').textContent,
    )).toBe('test name');
  });
});
