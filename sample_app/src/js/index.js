(function () {
  function convertToInteger(val) {
    var parsed = Number.parseInt(val, 10);
    if (Number.isInteger(parsed)) {
      return parsed;
    }
    return val;
  }

  function getNumber1El() {
    var el = document.getElementById('number-1');
    return el;
  }

  function getOperationEl() {
    var el = document.getElementById('operation');
    return el;
  }

  function getNumber2El() {
    var el = document.getElementById('number-2');
    return el;
  }

  function getResultEl() {
    var el = document.getElementById('result');
    return el;
  }

  function calcResult() {
    var number1Value = convertToInteger(getNumber1El().value);
    var operationValue = convertToInteger(getOperationEl().value);
    var number2Value = convertToInteger(getNumber2El().value);

    var result = null;

    switch (operationValue) {
      case 'plus':
        result = number1Value + number2Value;
        break;
      case 'minus':
        result = number1Value - number2Value;
        break;
      case 'times':
        result = number1Value * number2Value;
        break;
      case 'divided-by':
        result = number1Value / number2Value;
        break;
      default:
    }

    var resultEl = getResultEl();
    resultEl.value = result;
  }

  function addEventListeners() {
    var eventType = 'keyup';

    var number1 = getNumber1El();
    if (number1) {
      number1.addEventListener(eventType, calcResult);
    }

    var operation = getOperationEl();
    if (operation) {
      operation.addEventListener(eventType, calcResult);
    }

    var number2 = getNumber2El();
    if (number2) {
      number2.addEventListener(eventType, calcResult);
    }
  }

  addEventListeners();
})();
