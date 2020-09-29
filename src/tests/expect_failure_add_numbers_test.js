const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');

module.exports = {
  '@disabled': false,

  '@tags': ['ADD', 'EXPECTED_FAILURE'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'add numbers and expect failure': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    pages.template_page.calculateResult('5', '+', '5');

    browser.expect
      .element(pages.template_page.result)
      .value.to.equal('1')
      .before(100);
  }
};
