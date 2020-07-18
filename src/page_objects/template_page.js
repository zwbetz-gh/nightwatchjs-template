const commands = {
  setNumber1(val) {
    this.waitForElementVisible('@number1').setValue('@number1', val);
    return this;
  },
  setOperation(val) {
    this.waitForElementVisible('@operation').setValue('@operation', val);
    return this;
  },
  setNumber2(val) {
    this.waitForElementVisible('@number2').setValue('@number2', val);
    return this;
  }
};

const elements = {
  number1: '#number-1',
  operation: '#operation',
  number2: '#number-2',
  result: '#result'
};

module.exports = {
  url() { 
    return this.api.launchUrl; 
  },
  commands: [commands],
  elements: elements
};
