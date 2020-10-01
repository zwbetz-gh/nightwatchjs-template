const chalk = require('chalk');
const hooks = require('../shared/hooks');
const helper = require('../shared/helper');

module.exports = {
  '@disabled': false,

  '@tags': ['TAB', 'WINDOW', 'SWITCH'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'switch to tab': (browser) => {
    const scriptBody = function () {
      const href = 'https://duckduckgo.com';
      const el = document.createElement('a');
      el.target = '_blank';
      el.rel = 'noopener noreferrer';
      el.href = href;
      el.innerHTML = href;
      el.id = 'some_link';
      document.body.appendChild(el);
    };

    const scriptArgs = [];

    const executeCallback = function () {
      console.log('execute is complete');
    };

    browser.execute(scriptBody, scriptArgs, executeCallback);

    browser.source((response) => {
      console.log('source:', chalk.cyan(response.value));
    });

    browser.pause(500);

    browser.click('#some_link');

    helper.switchToTab(browser, 1);

    browser.custom_take_screenshot('tab_index_1');

    browser.pause(500);

    browser.assert.urlContains('duckduckgo');

    helper.switchToTab(browser, 0);

    browser.custom_take_screenshot('tab_index_0');

    browser.pause(500);

    browser.assert.visible('#some_link');
  }
};
