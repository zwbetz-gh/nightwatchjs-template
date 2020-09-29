const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');

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
    const pages = getPages(browser);

    pages.template_page.navigate();

    browser.custom_accessibility_assert();
  }
};
