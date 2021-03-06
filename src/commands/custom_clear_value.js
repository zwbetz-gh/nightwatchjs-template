const chalk = require('chalk');
const keys = require('../constants/keys');

const customClearValue = (thisRef, selector) => {
  thisRef.getValue(selector, (result) => {
    const {length} = result.value;
    if (length === 0) {
      console.log(
        `Element ${chalk.cyan(
          typeof selector === 'object' ? JSON.stringify(selector) : selector
        )} value has ${chalk.cyan('0')} length, moving on`
      );
      return;
    }
    thisRef.waitForElementVisible(selector);
    thisRef.click(selector);
    console.log(
      `Clearing element ${chalk.cyan(
        typeof selector === 'object' ? JSON.stringify(selector) : selector
      )} value ${chalk.cyan(result.value)} by sending ${chalk.cyan(
        length
      )} BACK_SPACE keys`
    );
    for (let i = 0; i < length; i++) {
      thisRef.keys([keys.BACK_SPACE]);
    }
    thisRef.keys([keys.TAB]);
  });
};

/**
 * Clear the value of an element.
 *
 * @param {string} selector - The CSS selector
 * @param {number} numberOfTimesToRun - An optional number of times to run
 */
const command = function (selector, numberOfTimesToRun = 2) {
  this.perform(() => {
    for (let i = 0; i < numberOfTimesToRun; i++) {
      // Try built-in clear value func
      this.clearValue(selector);
      // Then try custom clear value func
      customClearValue(this, selector);
    }
  });
  return this;
};

module.exports.command = command;
