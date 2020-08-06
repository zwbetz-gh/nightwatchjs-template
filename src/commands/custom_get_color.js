const componentToHex = (c) => {
  const hex = parseInt(c, 10).toString(16).toUpperCase();
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
  return rgbToHex(r, g, b);
};

const command = function (selector, callback) {
  this.perform(() => {
    this.isVisible(selector, () => {
      const funcBody = function (scopedSelector) {
        const element = document.querySelector(scopedSelector);
        const style = window.getComputedStyle(element, null);
        const {color} = style;
        const json = JSON.stringify(color);
        return json;
      };

      const funcArgs = [selector];

      this.execute(funcBody, funcArgs, (result) => {
        const rgb = JSON.parse(result.value);
        const hex = parseRgbToHex(rgb);
        console.log(`Selector <${selector}> has color <${hex}>`);
        callback(hex);
      });
    });
  });

  return this;
};

module.exports.command = command;
