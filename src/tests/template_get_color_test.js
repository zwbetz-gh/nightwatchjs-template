const hooks = require('../shared/hooks');
const template_page = require('../page_objects/template_page');

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
    browser.page.template_page().navigate();

    browser.custom_get_color(template_page.elements.number1, (actualColor) => {
      const expectedColor = '#495057';
      browser.assert.strictEqual(actualColor, expectedColor);
    });

    browser.custom_get_color(
      template_page.elements.number1,
      (actualColor) => {
        const expectedColor = '#495057';
        browser.assert.strictEqual(actualColor, expectedColor);
      },
      'color'
    );

    browser.custom_get_color(
      template_page.elements.number1,
      (actualColor) => {
        const expectedColor = '#FFFFFF';
        browser.assert.strictEqual(actualColor, expectedColor);
      },
      'backgroundColor'
    );
  }
};
