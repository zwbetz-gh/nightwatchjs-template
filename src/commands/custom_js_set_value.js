const {makePrettyJson} = require('../shared/shared');

const defaultCallback = function (response) {
  console.log(makePrettyJson(response.value));
  console.log('custom_js_set_value complete');
};

/**
 * Set an element with a value via js.
 *
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to set
 * @param {function(Object)} callback - An optional callback
 */
const command = function (selector, value, callback = defaultCallback) {
  this.perform(() => {
    console.log(`Setting element ${selector} with value ${value} via js`);

    const scriptBody = function (querySelector, elValue) {
      const response = {
        elementFound: false
      };
      const el = document.querySelector(querySelector);
      if (el) {
        el.value = elValue;
        response.elementFound = true;
      }
      return response;
    };

    const scriptArgs = [selector, value];

    this.execute(scriptBody, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;
