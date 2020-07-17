const keys = require('../constants/keys');

const command = function (selector) {
  this.perform(() => {
    this.waitForElementVisible(selector);
    this.click(selector);
    this.getValue(selector, (result) => {
      const {length} = result.value;
      console.log(
        `Clearing element <${selector}> value <${result.value}> by sending <${length}> BACK_SPACE keys`
      );
      for (let i = 0; i < length; i++) {
        this.keys([keys.BACK_SPACE]);
      }
    });
  });

  return this;
};

module.exports.command = command;
