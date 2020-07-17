const hooks = require('../../shared/hooks');

module.exports = {
  '@disabled': false,

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
      .keys(browser.Keys.RETURN)
      .custom_take_screenshot('duckduckgo');
  }
};