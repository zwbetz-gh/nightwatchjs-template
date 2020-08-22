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
    this.waitForElementVisible(elements.number1);
    this.setValue(elements.number1, val);
    return this;
  },
  setOperation: function (val) {
    this.waitForElementVisible(elements.operation);
    this.setValue(elements.operation, val);
    return this;
  },
  setNumber2: function (val) {
    this.waitForElementVisible(elements.number2);
    this.setValue(elements.number2, val);
    return this;
  },
  calculateResult: function (number1, operation, number2) {
    this.setNumber1(number1);
    this.setOperation(operation);
    this.setNumber2(number2);
    return this;
  }
};

module.exports = {
  url: url,
  elements: elements,
  commands: [commands]
};
