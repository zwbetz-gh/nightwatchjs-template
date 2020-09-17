const hooks = require('../shared/hooks');
const env = require('../shared/env');
const template_page = require('../page_objects/template_page');

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
    browser.page.template_page().navigate();

    if (env.getEnv().NIGHTWATCH_ENVIRONMENT.includes('CHROME')) {
      // custom_js_click
      browser.page.template_page().expect.element('@number1').to.not.be.active;

      browser.custom_js_click(template_page.elements.number1);

      browser.page.template_page().expect.element('@number1').to.be.active;

      // custom_js_set_value
      browser.page
        .template_page()
        .expect.element('@number1')
        .value.to.equal('');

      browser.custom_js_set_value(template_page.elements.number1, '123');

      browser.page
        .template_page()
        .expect.element('@number1')
        .value.to.equal('123');
    }
  }
};
