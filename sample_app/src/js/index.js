(function () {
  function convertToInteger(val) {
    var parsed = Number.parseInt(val, 10);
    if (Number.isInteger(parsed)) {
      return parsed;
    }
    return val;
  }

  function getNumber1Element() {
    var el = document.getElementById('number-1');
    return el;
  }

  function getOperationElement() {
    var el = document.getElementById('operation');
    return el;
  }

  function getNumber2Element() {
    var el = document.getElementById('number-2');
    return el;
  }

  function getResultElement() {
    var el = document.getElementById('result');
    return el;
  }

  function calcResult() {
    var number1Value = convertToInteger(getNumber1Element().value);
    var operationValue = convertToInteger(getOperationElement().value);
    var number2Value = convertToInteger(getNumber2Element().value);

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

    var resultElement = getResultElement();
    resultElement.value = result;
  }

  function addEventListeners() {
    var number1 = getNumber1Element();
    number1.addEventListener('keyup', calcResult);

    var operation = getOperationElement();
    operation.addEventListener('change', calcResult);

    var number2 = getNumber2Element();
    number2.addEventListener('keyup', calcResult);
  }

  addEventListeners();
})();
