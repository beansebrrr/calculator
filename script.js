/**
 * MATH OPERATIONS
 */

const add = (addend1, addend2) =>
  addend1 + addend2;

const subtract = (subtrahend, subtractor) =>
  subtrahend - subtractor;

const multiply = (multiplicand, multiplier) =>
  multiplicand * multiplier;

const divide = (dividend, divisor) =>
  dividend / divisor;

const operate = (num1, num2, operator) => {
  switch (operator) {
    case "+":
      return add(num1, num2);
    case "-":
      return subtract(num1, num2);
    case "*":
      return multiply(num1, num2);
    case "/":
      return divide(num1, num2);
  
    default:
      break;
  }
};


/**
 * UI
 */

const display = document.querySelector(".display")
const btnSection = document.querySelector(".btnSection")

btnSection.addEventListener("click", btn => {
  btn = btn.target;
  if (btn.id === "clear") {
    display.value = '';
  } else if (btn.id === "evaluate") {
    const output = evaluate(display.value);
    display.value = output;
  };

  const btnType = btn.className;
  const btnValue = btn.textContent;

  if (btnType.includes("numBtn") || btnType.includes("operatorBtn")) {
    display.value += btnValue;
  };
});

function evaluate(expression) {
  let output
  const operands = expression
    .split(/[+\-/*]/)
    .map(operand => +operand);
  const operators = expression
    .split("")
    .filter(char => char.match(/[+\-/*]/));
  
  while (operators.length > 0) {
    let operator = operators.shift()
    output = operate(...operands.splice(0,2), operator);
    operands.unshift(output);
  }
  return output;
};