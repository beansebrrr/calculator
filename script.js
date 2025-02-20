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
  divisor === 0
? "Uh oh!"
: dividend / divisor;

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
  } else if (btn.id === "return") {
    display.value = display.value.slice(0, -1)
  }
  else if (btn.id === "evaluate") {
    const output = evaluate(display.value);
    display.value = output;
  } else {
    const btnValue = btn.textContent;
    display.value += btnValue;
  }

});

// This might be the most beautiful piece of
// art I've ever made.
function evaluate(expression) {
  let output;
  const operands = expression
    .split(/[+\-/*]/)           // take out the math symbols
    .map(operand => +operand);  // turn the operands into integers

  const operators = expression  // only take in the math symbols
    .split("")
    .filter(char => char.match(/[+\-/*]/));
  
  while (operators.length > 0) {
    let operator = operators.shift();
    output = operate(...operands.splice(0,2), operator);
    operands.unshift(output);
  };
  return output ? output.toFixed(6) : operands[0];
};