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
    const clickCallback = () => {
      console.log(`Element ${chalk.cyan(selector)} clicked`);
    };
    browser.click(selector, clickCallback);
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
    const setValueCallback = () => {
      console.log(
        `Element ${chalk.cyan(selector)} value set to ${chalk.cyan(value)}`
      );
    };
    browser.setValue(selector, value, setValueCallback);
  }

  if (assertValue) {
    browser.expect.element(selector).value.to.equal(value);
  }
};

/**
 * Assert that the element is present.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertPresent = (browser, selector) => {
  browser.expect.element(selector).to.be.present;
};

/**
 * Assert that the element is not present.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertNotPresent = (browser, selector) => {
  browser.expect.element(selector).to.not.be.present;
};

/**
 * Assert that the element value does equal the expected value.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to assert
 */
const assertValue = (browser, selector, value) => {
  browser.expect.element(selector).value.to.equal(value);
};

/**
 * Assert that the element value does not equal the expected value.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to assert
 */
const assertNotValue = (browser, selector, value) => {
  browser.expect.element(selector).value.to.not.equal(value);
};

/**
 * Assert that the element text does equal the expected text.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertText = (browser, selector, text) => {
  browser.expect.element(selector).text.to.equal(text);
};

/**
 * Assert that the element text does not equal the expected text.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertNotText = (browser, selector, text) => {
  browser.expect.element(selector).text.to.not.equal(text);
};

/**
 * Assert that the element value does contain the expected value.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to assert
 */
const assertContainsValue = (browser, selector, value) => {
  browser.expect.element(selector).value.to.contain(value);
};

/**
 * Assert that the element value does not contain the expected value.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} value - The value to assert
 */
const assertNotContainsValue = (browser, selector, value) => {
  browser.expect.element(selector).value.to.not.contain(value);
};

/**
 * Assert that the element text does contain the expected text.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertContainsText = (browser, selector, text) => {
  browser.expect.element(selector).text.to.contain(text);
};

/**
 * Assert that the element text does not contain the expected text.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} text - The text to assert
 */
const assertNotContainsText = (browser, selector, text) => {
  browser.expect.element(selector).text.to.not.contain(text);
};

/**
 * Assert that an element is enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertEnabled = (browser, selector) => {
  browser.expect.element(selector).to.be.enabled;
};

/**
 * Assert that an element is not enabled.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const assertNotEnabled = (browser, selector) => {
  browser.expect.element(selector).to.not.be.enabled;
};

/**
 * Assert that the element attribute equals the expected value.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} attribute - The attribute to assert
 * @param {string} value - The value to assert
 */
const assertAttribute = (browser, selector, attribute, value) => {
  browser.expect.element(selector).attribute(attribute).to.equal(value);
};

/**
 * Log the value of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const logValue = (browser, selector) => {
  browser.getValue(selector, (response) => {
    console.log(
      `Element ${chalk.cyan(selector)} value is ${chalk.cyan(response.value)}`
    );
  });
};

/**
 * Log the text of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 */
const logText = (browser, selector) => {
  browser.getText(selector, (response) => {
    console.log(
      `Element ${chalk.cyan(selector)} text is ${chalk.cyan(response.value)}`
    );
  });
};

/**
 * Log the attribute of an element.
 *
 * @param {object} browser - The browser object
 * @param {string} selector - The CSS selector
 * @param {string} attribute - The attribute to log
 */
const logAttribute = (browser, selector, attribute) => {
  browser.getAttribute(selector, attribute, (response) => {
    console.log(
      `Element ${chalk.cyan(selector)} attribute ${chalk.cyan(
        attribute
      )} is ${chalk.cyan(response.value)}`
    );
  });
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
  assertPresent,
  assertNotPresent,
  assertValue,
  assertNotValue,
  assertText,
  assertNotText,
  assertContainsValue,
  assertNotContainsValue,
  assertContainsText,
  assertNotContainsText,
  assertEnabled,
  assertNotEnabled,
  assertAttribute,
  logValue,
  logText,
  logAttribute,
  switchToTab
};
