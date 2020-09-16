const hooks = require('../shared/hooks');

module.exports = {
  '@disabled': false,

  '@tags': ['ACCESSIBILITY', '508', 'AXE'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'accessibility expect failure': (browser) => {
    browser.page.template_page().navigate();

    browser.custom_accessibility_assert();
  }
};
