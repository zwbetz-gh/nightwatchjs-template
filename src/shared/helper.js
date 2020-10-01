const chalk = require('chalk');
const {makePrettyJson} = require('./shared');

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
 * @param {boolean} [viaJs] - If true, set the element value via JS. If false, set the element value via WebDriver
 * @param {boolean} [assertValue] - If true, assert the value that was set
 */
const setValue = (
  browser,
  selector,
  value,
  viaJs = false,
  assertValue = true
) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;

  if (viaJs) {
    browser.custom_js_set_value(selector, value);
  } else {
    browser.setValue(selector, value);
  }

  if (assertValue) {
    browser.expect.element(selector).value.to.equal(value);
  }
};

/**
 * Assert the value of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to assert
 */
const assertValue = (browser, selector, value) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).value.to.equal(value);
};

/**
 * Assert the text of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertText = (browser, selector, text) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).text.to.equal(text);
};

/**
 * Assert that an element contains text.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertContainsText = (browser, selector, text) => {
  browser.waitForElementVisible(selector);
  browser.assert.containsText(selector, text);
};

/**
 * Assert that an element is enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertEnabled = (browser, selector) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.be.enabled;
};

/**
 * Assert that an element is not enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertNotEnabled = (browser, selector) => {
  browser.waitForElementVisible(selector);
  browser.expect.element(selector).to.not.be.enabled;
};

/**
 * Switch to a tab.
 *
 * @param {object} browser - The browser object
 * @param {number} [tabIndexToSwitchTo] - The tab index to switch to
 */
const switchToTab = (browser, tabIndexToSwitchTo = 1) => {
  browser.windowHandles((response) => {
    const tabs = response.value;
    const windowHandle = tabs[tabIndexToSwitchTo];
    console.log('tabs:', chalk.cyan(makePrettyJson(tabs)));
    const switchWindowCallback = () => {
      console.log(
        `Switched to tab index of ${chalk.cyan(
          tabIndexToSwitchTo
        )}, window handle of ${chalk.cyan(windowHandle)}`
      );
    };
    browser.switchWindow(windowHandle, switchWindowCallback);
  });
};

module.exports = {
  click,
  setValue,
  assertValue,
  assertText,
  assertContainsText,
  assertEnabled,
  assertNotEnabled,
  switchToTab
};
