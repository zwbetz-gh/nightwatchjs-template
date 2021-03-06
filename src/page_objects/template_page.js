const helper = require('../shared/helper');

let browser;

const page = {
  init(b) {
    browser = b;
    return this;
  },
  navigate() {
    browser.url(browser.launchUrl);
    return this;
  },

  number1: '#number-1',
  operation: '#operation',
  number2: '#number-2',
  result: '#result',

  clickNumber1() {
    helper.click(browser, this.number1);
    return this;
  },
  setNumber1(val) {
    helper.setValue(browser, this.number1, val);
    return this;
  },
  clickOperation() {
    helper.click(browser, this.operation);
    return this;
  },
  setOperation(val) {
    helper.setValue(browser, this.operation, val, false, false);
    return this;
  },
  clickNumber2() {
    helper.click(browser, this.number2);
    return this;
  },
  setNumber2(val) {
    helper.setValue(browser, this.number2, val);
    return this;
  },
  calculateResult(number1, operation, number2) {
    this.setNumber1(number1);
    this.setOperation(operation);
    this.setNumber2(number2);
    return this;
  }
};

module.exports = page;
