const hooks = require('../shared/hooks');
const {getPages} = require('../shared/pages');
const env = require('../shared/env');

module.exports = {
  '@disabled': false,

  '@tags': ['JS', 'COMMANDS'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'js commands': (browser) => {
    const pages = getPages(browser);

    pages.template_page.navigate();

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      // custom_js_click
      browser.expect.element(pages.template_page.number1).to.not.be.active;

      browser.custom_js_click('#does-not-exist');

      browser.custom_js_click(pages.template_page.number1);

      browser.expect.element(pages.template_page.number1).to.be.active;

      // custom_js_set_value
      browser.expect.element(pages.template_page.number1).value.to.equal('');

      browser.custom_js_set_value('#does-not-exist', '123');

      browser.custom_js_set_value(pages.template_page.number1, '123');

      browser.expect.element(pages.template_page.number1).value.to.equal('123');
    }
  }
};
