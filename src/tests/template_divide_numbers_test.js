const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['DIVIDE'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'divide numbers': (browser) => {
    browser.page
      .template_page()
      .navigate()
      .calculateResult('5', '/', '5')
      .assert.value('@result', '1');
  }
};
