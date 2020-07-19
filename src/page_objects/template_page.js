const url = function () {
  return this.api.launchUrl;
};

const elements = {
  number1: '#number-1',
  operation: '#operation',
  number2: '#number-2',
  result: '#result'
};

const commands = {
  setNumber1: function (val) {
    this.waitForElementVisible('@number1').setValue('@number1', val);
    return this;
  },
  setOperation: function (val) {
    this.waitForElementVisible('@operation').setValue('@operation', val);
    return this;
  },
  setNumber2: function (val) {
    this.waitForElementVisible('@number2').setValue('@number2', val);
    return this;
  },
  calculateResult: function (number1, operation, number2) {
    this.setNumber1(number1).setOperation(operation).setNumber2(number2);
    return this;
  }
};

module.exports = {
  url: url,
  elements: elements,
  commands: [commands]
};
