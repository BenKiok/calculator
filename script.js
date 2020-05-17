const calculatorModule = (() => {
	const compute = (() => {
		let firstNum, secondNum, operator;
		const pressOperatorKey = (val, method) => {
			firstNum = val;
			operator = method;
			return "";
		}
		const pressEqualKey = (val) => {
			secondNum = val;
			return operator(firstNum, secondNum);
		}
		const clear = () => {
			firstNum = 0;
			secondNum = 0;
			operator = undefined;
			return "";
		}

		return { pressOperatorKey, pressEqualKey, clear };
	})();

	const operators = (() => {
		const sum = (val1, val2) => {
			return Number(val1) + Number(val2);
		}

		const difference = (val1, val2) => {
			return Number(val1) - Number(val2);
		}

		const product = (val1, val2) => {
			return Number(val1) * Number(val2);
		}

		const quotient = (val1, val2) => {
			if (val2 == 0) {
				return "Err: cannot divide by 0";
			}
			return Number(val1) / Number(val2);
		}

		const percentValue = (val) => {
			return quotient(val, 100);
		}

		const toggleSign = (val) => {
			if (Number(val) < 0) {
				return Math.abs(val);
			}
			return difference(val, product(val, 2));
		}

		return { sum, difference, product, quotient, percentValue, toggleSign };
	})();

	const assignInputBehaviors = (() => {
		const keypad = (() => {let nodelist=document.querySelectorAll("span"),spanArr = [];for(let i=0;i<nodelist.length;i++){spanArr[i]=nodelist[i];}return spanArr;})();
		const input = document.querySelector("input");

		keypad.forEach(key => {
			let btnVal = key.innerHTML;

			if (Number.isInteger(Number(btnVal))) {
				key.addEventListener("click", () => {
					input.value += btnVal;
				});
			} else if (btnVal == ".") {
				key.addEventListener("click", () => {
					let i = input.value.length;
					while (i) {
						if (input.value[i - 1] == ".") {
							break;
						} else if (i == input.value.length) {
							input.value += btnVal;
							break;
						}

						i--;
					}
				});
			} else {
				switch (btnVal) {
					case "+":
						key.addEventListener("click", () => {
							input.value = compute.pressOperatorKey(input.value, operators.sum);
						});
						break;
					case "-":
						key.addEventListener("click", () => {
							input.value = compute.pressOperatorKey(input.value, operators.difference);
						});					
						break;
					case "x":
						key.addEventListener("click", () => {
							input.value = compute.pressOperatorKey(input.value, operators.product);
						});
						break;
					case "/":
						key.addEventListener("click", () => {
							input.value = compute.pressOperatorKey(input.value, operators.quotient);
						});
						break;
					case "%":
						key.addEventListener("click", () => {
							input.value = operators.percentValue(input.value);
						});
						break;
					case "=":
						key.addEventListener("click", () => {
							input.value = compute.pressEqualKey(input.value);
						});
						break;
					case "AC":
						key.addEventListener("click", () => {
							input.value = compute.clear();
						});
						break;
					case "-/+":
						key.addEventListener("click", () => {
							input.value = operators.toggleSign(input.value);
						});
						break;
				}
			}
		});
	})();
})();

// *************************** OLD CODE *********************************

// const input = document.querySelector('input');
// const keyPad = Array.from(document.querySelectorAll('span'));
// let firstNum;
// let secondNum;
// let operation;
// let operatorKeyIsPressed = false;

// input.value = ''; // saves input value after refreshing browser


// keyPad.forEach(function(key) {
//   if (key.textContent == '+' || key.textContent == '-' || key.textContent == '/' || key.textContent == 'x') {
//     key.addEventListener('click', () => { pressOperatorKey(key) }, false);
//   } else if (key.textContent == '=') {
//     key.addEventListener('click', pressEqualKey, false);
//   } else if (key.textContent == 'AC') {
//     key.addEventListener('click', () => { pressAC(key) }, false);
//   } else if (key.textContent == '-/+') {
//     key.addEventListener('click', pressSignToggle, false);
//   } else if (key.textContent == '%') {
//     key.addEventListener('click', pressPercentKey, false);
//   } else {
//     key.addEventListener('click', () => { pressNumberKey(key) }, false);
//   }
// });


// function add(num1, num2) {
//   return Number(num1) + Number(num2);
// }

// function subtract(num1, num2) {
//   return num1 - num2;
// }

// function multiply(num1, num2) {
//   return num1 * num2;
// }

// function divide(num1, num2) {
//   return num1 / num2;
// }

// function operator(funct, num1, num2) {
//   return funct(num1, num2);
// }

// function pressOperatorKey(key) {
//   firstNum = input.value;
//   switch (key.textContent) {
//     case '+':
//       operation = add;
//       break;
//     case '-':
//       operation = subtract;
//       break;
//     case 'x':
//       operation = multiply;
//       break;
//     case '/':
//       operation = divide;
//       break;
//     }
//   operatorKeyIsPressed = true;
//   input.value = '';
// }

// function pressEqualKey() {
//   secondNum = input.value;
//   if (firstNum && secondNum) {
//     input.value = operator(operation, firstNum, secondNum);
//   }

//   firstNum = secondNum;
//   operatorKeyIsPressed = false;
// }

// function pressNumberKey(key) {
//   input.value += key.textContent;
// }

// function pressAC() {
//   if (operatorKeyIsPressed) {
//     console.log('cleared input');
//     input.value = '';
//     operatorKeyIsPressed = false;
//   } else {
//     console.log('cleared all');
//     firstNum = undefined;
//     secondNum = undefined;
//     operation = undefined;
//     input.value = '';
//   }
// }

// function pressSignToggle() {
//   if (input.value[0] == '-') {
//     let inverseInput = '';
//     for(let i = 1; i < input.value.length; i++) {
//       inverseInput += input.value[i];
//     };
//     input.value = inverseInput;
//   } else {
//     input.value = `-${input.value}`;
//   }
// }

// function pressPercentKey() {
//   input.value /= 100;
// }
