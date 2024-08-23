import puppeteer from 'puppeteer';

let browser;
let page;
beforeAll(async () => {
  browser = await puppeteer.launch({
    // headless: false,
    // slowMo: 200,
    // timeout: 0
  });
  page = await browser.newPage();
  await page.goto('http://localhost:3000/');
  await page.waitForSelector('.event-item');
});

afterAll(() => {
  browser.close();
});


describe('show/hide event details', () => {

  test('An event element is collapsed by default', async () => {
    const eventDetails = await page.$('.event-item .event-details');
    expect(eventDetails).toBeNull();
  });

  test('User can expand an event to see details', async () => {
    await page.click('.event-item .details-btn');
    const eventDetails = await page.$('.event-item .event-details');
    expect(eventDetails).toBeDefined();
  });

  test('User can collapse an event to hide details', async () => {
    await page.click('.event-item .details-btn');
    const eventDetails = await page.$('.event-item .event-details');
    expect(eventDetails).toBeNull();
  });
});

describe('filter events by city', () => {

  test('User can filter events by city', async () => {
    await page.type('.city', 'Berlin');
    await page.waitForSelector('.suggestions li');
    await page.click('.suggestions li');
    await page.waitForSelector('.event-item');
    const events = await page.$$('.event-item');
    for (let event of events) {
      const location = await event.$eval('.event-location', el => el.textContent);
      expect(location).toContain('Berlin');
    }
  });

  test('User can see all events when clearing the city search input and selecting "see all cities"', async () => {
    await page.click('.city', { clickCount: 3 });
    await page.keyboard.press('Backspace');
    await page.waitForSelector('.suggestions li');
    await page.evaluate(() => {
      const suggestions = Array.from(document.querySelectorAll('.suggestions li'));
      const seeAllOption = suggestions.find(li => li.textContent === 'See all cities');
      seeAllOption && seeAllOption.click();
    });

    await page.waitForSelector('.event-item');
    const events = await page.$$('.event-item');
    expect(events.length).toBeGreaterThan(0);

    // verify that the events are from multiple cities
    const locations = await Promise.all(events.map(event => event.$eval('.event-location', el => el.textContent)));
    const uniqueCities = new Set(locations);
    expect(uniqueCities.size).toBeGreaterThan(1);
  });
});

describe('specify number of events to show', () => {

  test('When user hasn’t specified a number, 32 is the default number', async () => {
    const events = await page.$$('.event-item');
    expect(events.length).toBe(32);
  });

  test('User can change the number of events they want to see', async () => {
    await page.click('.number-of-events', { clickCount: 3 });
    await page.type('.number-of-events', '10');
    await page.keyboard.press('Enter');
    await page.waitForSelector('.event-item');

    const events = await page.$$('.event-item');
    expect(events.length).toBe(10);
  });
});