const componentToHex = (component) => {
  const hex = parseInt(component, 10).toString(16).toUpperCase();
  if (hex.length === 1) {
    return `0${hex}`;
  }
  return hex;
};

const rgbToHex = (r, g, b) =>
  `#${componentToHex(r)}${componentToHex(g)}${componentToHex(b)}`;

const parseRgbToHex = (rgb) => {
  const result = rgb.replace('rgb(', '').replace(')', '').replace(' ', '');
  const components = result.split(',');
  const r = components[0];
  const g = components[1];
  const b = components[2];
  const hex = rgbToHex(r, g, b);
  return hex;
};

const command = function (selector, callback, cssProperty = 'color') {
  this.perform(() => {
    const funcBody = function (scopedSelector, scopedCssProperty) {
      const element = document.querySelector(scopedSelector);
      const style = window.getComputedStyle(element, null);
      const json = JSON.stringify(style[scopedCssProperty]);
      return json;
    };

    const funcArgs = [selector, cssProperty];

    this.waitForElementVisible(selector);

    this.execute(funcBody, funcArgs, (result) => {
      const rgb = JSON.parse(result.value);
      const hex = parseRgbToHex(rgb);
      console.log(`Selector ${selector} has ${cssProperty} ${hex}`);
      callback(hex);
    });
  });

  return this;
};

module.exports.command = command;
