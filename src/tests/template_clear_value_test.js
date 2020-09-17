const hooks = require('../shared/hooks');

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
      .assert.value('@number1', '123')
      .custom_clear_value('@number1')
      .assert.value('@number1', '');
  }
};
