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
    browser.waitForElementVisible(this.number1);
    browser.click(this.number1);
    return this;
  },
  setNumber1: function (val) {
    browser.waitForElementVisible(this.number1);
    browser.setValue(this.number1, val);
    return this;
  },
  clickOperation: function () {
    browser.waitForElementVisible(this.operation);
    browser.click(this.operation);
    return this;
  },
  setOperation: function (val) {
    browser.waitForElementVisible(this.operation);
    browser.setValue(this.operation, val);
    return this;
  },
  clickNumber2: function () {
    browser.waitForElementVisible(this.number2);
    browser.click(this.number2);
    return this;
  },
  setNumber2: function (val) {
    browser.waitForElementVisible(this.number2);
    browser.setValue(this.number2, val);
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
