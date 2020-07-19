const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['MINUS'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'Minus numbers': (browser) => {
    browser.page
      .template_page()
      .navigate()
      .setNumber1('5')
      .setOperation('-')
      .setNumber2('5')
      .assert.value('@result', '0');
  }
};
