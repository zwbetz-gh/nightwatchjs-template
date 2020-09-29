const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');
const helper = require('../shared/helper');

module.exports = {
  '@disabled': false,

  '@tags': ['MINUS'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'minus numbers': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    pages.template_page.calculateResult('5', '-', '5');

    helper.assertValue(browser, pages.template_page.result, '0');
  }
};
