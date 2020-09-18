const {makePrettyJson} = require('../shared/shared');

const defaultCallback = function (response) {
  console.log(makePrettyJson(response.value));
  console.log('custom_js_click complete');
};

/**
 * Click an element via js
 *
 * @param {string} selector - The CSS selector
 * @param {function(Object)} callback - An optional callback
 */
const command = function (selector, callback = defaultCallback) {
  this.perform(() => {
    console.log(`Clicking element ${selector} via js`);

    const scriptBody = function (querySelector) {
      const response = {
        elementFound: false
      };
      const el = document.querySelector(querySelector);
      if (el) {
        response.elementFound = true;
        el.focus();
        el.click();
      }
      return response;
    };

    const scriptArgs = [selector];

    this.execute(scriptBody, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;
