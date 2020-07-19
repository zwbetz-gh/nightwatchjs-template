const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['TIMES'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'Times numbers': (browser) => {
    browser.page
      .template_page()
      .navigate()
      .calculateResult(5, '*', 5)
      .assert.value('@result', '25');
  }
};
