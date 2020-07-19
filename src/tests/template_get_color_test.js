const hooks = require('../shared/hooks');
const template_page = require('../page_objects/template_page');

module.exports = {
  '@disabled': false,

  '@tags': ['COLOR'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'Get color': (browser) => {
    browser.page
      .template_page()
      .navigate()
      .custom_get_color(template_page.elements.number1, (actualColor) => {
        const expectedColor = '#495057';
        browser.assert.equal(actualColor, expectedColor);
      });
  }
};
