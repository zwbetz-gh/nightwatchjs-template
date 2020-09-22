const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');

module.exports = {
  '@disabled': false,

  '@tags': ['CLEAR_VALUE'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'clear value': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    pages.template_page.setNumber1('123');

    browser.assert.value(pages.template_page.number1, '123');

    browser.custom_clear_value(pages.template_page.number1);

    browser.assert.value(pages.template_page.number1, '');
  }
};
