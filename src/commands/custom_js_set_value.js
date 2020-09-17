const defaultCallback = function () {
  console.log('custom_js_set_value called');
};

const command = function (selector, value, callback = defaultCallback) {
  this.perform(() => {
    console.log(`Setting element ${selector} with value ${value} via js`);
    const scriptBody = function (querySelector, elValue) {
      const el = document.querySelector(querySelector);
      if (el) {
        el.value = elValue;
      }
    };
    const scriptArgs = [selector, value];
    this.execute(scriptBody, scriptArgs, callback);
  });
  return this;
};

module.exports.command = command;
