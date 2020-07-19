const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['ADD', 'EXPECTED_FAILURE'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'Add numbers and expect failure': (browser) => {
    browser.page
      .template_page()
      .navigate()
      .setNumber1('5')
      .setOperation('+')
      .setNumber2('5')
      .assert.value('@result', '0');
  }
};