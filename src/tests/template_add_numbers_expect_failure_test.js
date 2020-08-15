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
      .calculateResult('5', '+', '5')
      .expect.element('@result')
      .value.to.equal('1')
      .before(100);
  }
};
