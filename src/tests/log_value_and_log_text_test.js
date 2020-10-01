const chalk = require('chalk');
const hooks = require('../shared/hooks');
const helper = require('../shared/helper');

module.exports = {
  '@disabled': false,

  '@tags': ['LOG', 'VALUE', 'TEXT'],

  beforeEach: (browser) => {
    hooks.beforeEach(browser);
  },

  afterEach: (browser) => {
    hooks.afterEach(browser);
  },

  'log value and log text': (browser) => {
    const scriptBody = function () {
      const theLabel = document.createElement('label');
      theLabel.textContent = 'the label';
      theLabel.htmlFor = 'the_input';
      theLabel.id = 'the_label';
      document.body.appendChild(theLabel);

      const theInput = document.createElement('input');
      theInput.type = 'text';
      theInput.id = 'the_input';
      document.body.appendChild(theInput);
    };

    const scriptArgs = [];

    const executeCallback = function () {
      console.log('execute is complete');
    };

    browser.execute(scriptBody, scriptArgs, executeCallback);

    browser.source((response) => {
      console.log('source:', chalk.cyan(response.value));
    });

    helper.setValue(browser, '#the_input', 'the value');

    helper.logValue(browser, '#the_input');

    helper.logText(browser, '#the_label');
  }
};
