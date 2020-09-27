/**
 * Adapted from https://github.com/ahmadnassri/nightwatch-accessibility/blob/master/commands/initAccessibility.js
 */
const fs = require('fs');
const path = require('path');

const source = fs.readFileSync(
  path.resolve(
    path.join(path.dirname(require.resolve('axe-core')), 'axe.min.js')
  ),
  'utf8'
);

const scriptBody = function (src) {
  const elementId = 'nightwatch-accessibility';
  // ensure to inject only once!
  if (!document.querySelector(`#${elementId}`)) {
    const script = document.createElement('script');
    script.id = elementId;
    script.text = src;
    document.head.appendChild(script);
  }
};

/**
 * Inject axe-core into the page.
 */
const command = function () {
  this.perform(() => {
    const scriptArgs = [source];

    const callback = function () {
      console.log('aXe script injected');
    };

    this.execute(scriptBody, scriptArgs, callback);
  });

  return this;
};

module.exports.command = command;
