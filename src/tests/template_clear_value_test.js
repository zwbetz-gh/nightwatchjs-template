const hooks = require('../shared/hooks');
const template_page = require('../page_objects/template_page');

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
    browser.page
      .template_page()
      .navigate()
      .setNumber1('123')
      .custom_clear_value(template_page.elements.number1)
      .assert.value(template_page.elements.number1, '');
  }
};
