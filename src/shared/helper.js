/**
 * Click an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} [text] - The element text. If truthy, verify the element text
 * @param {boolean} [viaJs] - If true, click the element via JS. If false, click the element via WebDriver
 */
const click = (browser, selector, text, viaJs = false) => {
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

/**
 * Set the value of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to set
 * @param {boolean} [verifyValue] - If true, verify the value that was set
 */
const setValue = (browser, selector, value, verifyValue = true) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;
  browser.setValue(selector, value);

  if (verifyValue) {
    browser.expect.element(selector).value.to.equal(value);
  }
};

/**
 * Verify the value of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to verify
 */
const verifyValue = (browser, selector, value) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).value.to.equal(value);
};

/**
 * Verify the text of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to verify
 */
const verifyText = (browser, selector, text) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).text.to.equal(text);
};

/**
 * Verify that an element is enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const verifyEnabled = (browser, selector) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;
};

/**
 * Verify that an element is not enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
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
