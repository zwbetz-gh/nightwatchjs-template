const defaultCallback = function () {
  console.log('custom_js_click called');
};

const command = function (selector, callback = defaultCallback) {
  this.perform(() => {
    console.log(`Clicking element ${selector} via js`);
    const scriptBody = function (querySelector) {
      const el = document.querySelector(querySelector);
      if (el) {
        el.focus();
        el.click();
      }
    };
    const scriptArgs = [selector];
    this.execute(scriptBody, scriptArgs, callback);
  });
  return this;
};

module.exports.command = command;
