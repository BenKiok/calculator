const input = document.querySelector('input');
const keyPad = Array.from(document.querySelectorAll('span'));
let firstNum;
let secondNum;
let operation;
let operatorKeyIsPressed = false;

input.value = ''; // saves input value after refreshing browser


keyPad.forEach(function(key) {
  if (key.textContent == '+' || key.textContent == '-' || key.textContent == '/' || key.textContent == 'x') {
    key.addEventListener('click', () => { pressOperatorKey(key) }, false);
  } else if (key.textContent == '=') {
    key.addEventListener('click', pressEqualKey, false);
  } else if (key.textContent == 'AC') {
    key.addEventListener('click', () => { pressAC(key) }, false);
  } else if (key.textContent == '-/+') {
    key.addEventListener('click', pressSignToggle, false);
  } else if (key.textContent == '%') {
    key.addEventListener('click', pressPercentKey, false);
  } else {
    key.addEventListener('click', () => { pressNumberKey(key) }, false);
  }
});


function add(num1, num2) {
  return Number(num1) + Number(num2);
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operator(funct, num1, num2) {
  return funct(num1, num2);
}

function pressOperatorKey(key) {
  firstNum = input.value;
  switch (key.textContent) {
    case '+':
      operation = add;
      break;
    case '-':
      operation = subtract;
      break;
    case 'x':
      operation = multiply;
      break;
    case '/':
      operation = divide;
      break;
    }
  operatorKeyIsPressed = true;
  input.value = '';
}

function pressEqualKey() {
  secondNum = input.value;
  if (typeof firstNum == 'string' && typeof secondNum == 'string') {
    input.value = operator(operation, firstNum, secondNum);
  }

  firstNum = secondNum;
  operatorKeyIsPressed = false;
}

function pressNumberKey(key) {
  input.value += key.textContent;
}

function pressAC() {
  if (operatorKeyIsPressed) {
    console.log('cleared input');
    input.value = '';
    operatorKeyIsPressed = false;
  } else {
    console.log('cleared all');
    firstNum = undefined;
    secondNum = undefined;
    operation = undefined;
    input.value = '';
  }
}

function pressSignToggle() {
  if (input.value[0] == '-') {
    let inverseInput = '';
    for(let i = 1; i < input.value.length; i++) {
      inverseInput += input.value[i];
    };
    input.value = inverseInput;
  } else {
    input.value = `-${input.value}`;
  }
}

function pressPercentKey() {
  input.value /= 100;
}
