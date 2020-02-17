const input = document.querySelector('input');
const keyPad = Array.from(document.querySelectorAll('span'));
let firstNum;
let secondNum;
let operation;

input.value = ''; // saves input value after refreshing browser

keyPad.forEach(function(key) {
  if (key.textContent == '+' || key.textContent == '-' || key.textContent == '/' || key.textContent == 'x') {
    key.addEventListener('click', () => { pressOperatorKey(key) }, false);
  } else if (key.textContent == '=') {
    key.addEventListener('click', pressEqualKey, false);
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
    case '*':
      operation = multiply;
      break;
    case '/':
      operation = divide;
      break;
    }
  input.value = '';
}

function pressEqualKey() {
  secondNum = input.value;
  input.value = operator(operation, firstNum, secondNum);
}

function pressNumberKey(key) {
  input.value += key.textContent;
}
