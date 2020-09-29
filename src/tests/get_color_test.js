const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');

module.exports = {
  '@disabled': false,

  '@tags': ['GET_COLOR'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'get color': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    browser.custom_get_color(pages.template_page.number1, (actualColor) => {
      const expectedColor = '#495057';
      browser.assert.strictEqual(actualColor, expectedColor);
    });

    browser.custom_get_color(
      pages.template_page.number1,
      (actualColor) => {
        const expectedColor = '#495057';
        browser.assert.strictEqual(actualColor, expectedColor);
      },
      'color'
    );

    browser.custom_get_color(
      pages.template_page.number1,
      (actualColor) => {
        const expectedColor = '#FFFFFF';
        browser.assert.strictEqual(actualColor, expectedColor);
      },
      'backgroundColor'
    );
  }
};
