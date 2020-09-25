const page_helper = require('../shared/page_helper');

let browser;

const page = {
  init: function (b) {
    browser = b;
    return this;
  },
  navigate: function () {
    browser.url(browser.launchUrl);
    return this;
  },

  number1: '#number-1',
  operation: '#operation',
  number2: '#number-2',
  result: '#result',

  clickNumber1: function () {
    page_helper.click(browser, this.number1);
    return this;
  },
  setNumber1: function (val) {
    page_helper.setValue(browser, this.number1, val);
    return this;
  },
  clickOperation: function () {
    page_helper.click(browser, this.operation);
    return this;
  },
  setOperation: function (val) {
    browser.waitForElementVisible(this.operation);
    browser.expect.element(this.operation).to.be.enabled;
    browser.setValue(this.operation, val);
    return this;
  },
  clickNumber2: function () {
    page_helper.click(browser, this.number2);
    return this;
  },
  setNumber2: function (val) {
    page_helper.setValue(browser, this.number2, val);
    return this;
  },
  calculateResult: function (number1, operation, number2) {
    this.setNumber1(number1);
    this.setOperation(operation);
    this.setNumber2(number2);
    return this;
  }
};

module.exports = page;
