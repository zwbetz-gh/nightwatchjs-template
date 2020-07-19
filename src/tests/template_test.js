const hooks = require('../shared/hooks');
const keys = require('../constants/keys');

module.exports = {
  '@disabled': true,

  '@tags': ['TODO_TAG'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  /**
   * TODO description
   */
  'TODO testcase': (browser) => {
    const selector = '#search_form_input_homepage';

    browser
      .init()
      .waitForElementVisible(selector)
      .custom_get_color(selector, (color) => {
        console.log('Search bar color', color);
      })
      .setValue(selector, 'template')
      .custom_clear_value(selector)
      .setValue(selector, 'template')
      .keys(keys.RETURN)
      .custom_take_screenshot('duckduckgo');

    browser.assert.equal(1, 2);
  }
};
