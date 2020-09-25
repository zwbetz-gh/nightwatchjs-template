const click = (browser, selector, text, viaJs) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;

  if (text) {
    browser.expect.element(selector).text.to.equal(text);
  }

  if (viaJs) {
    browser.custom_js_click(selector);
  } else {
    browser.click(selector);
  }
};

const setValue = (browser, selector, value) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;
  browser.setValue(selector, value);
  browser.expect.element(selector).value.to.equal(value);
};

const verifyValue = (browser, selector, value) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).value.to.equal(value);
};

const verifyText = (browser, selector, text) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).text.to.equal(text);
};

const verifyEnabled = (browser, selector) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;
};

const verifyNotEnabled = (browser, selector) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.not.be.enabled;
};

module.exports = {
  click,
  setValue,
  verifyValue,
  verifyText,
  verifyEnabled,
  verifyNotEnabled
};
