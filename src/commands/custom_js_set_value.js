const chalk = require('chalk');
const {makePrettyJson} = require('../shared/shared');

const defaultCallback = function (response) {
  console.log(makePrettyJson(response.value));
  console.log('custom_js_set_value complete');
};

/**
 * Set the value of an element via js.
 *
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to set
 * @param {function(Object)} callback - An optional callback
 */
const command = function (selector, value, callback = defaultCallback) {
  this.perform(() => {
    console.log(
      `Setting element ${chalk.cyan(selector)} with value ${chalk.cyan(
        value
      )} via js`
    );

    const scriptBody = function (querySelector, elValue) {
      const response = {
        elementFound: false
      };
      const el = document.querySelector(querySelector);
      if (el) {
        response.elementFound = true;
        el.focus();
        el.value = elValue;
      }
      return response;
    };

    const scriptArgs = [selector, value];

    this.execute(scriptBody, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;
