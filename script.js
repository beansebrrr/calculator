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
let currentOperation = ''

btnSection.addEventListener("click", (e) => {
  const val = e.target.value
  let output = '';
  if (!val) {
    return
  } else if (val === "ac") {
    currentOperation = '';
    output = currentOperation;
  }
  else if (val === "=") {
    output = getOutput(currentOperation);
    currentOperation = '';
  } else {
    currentOperation = currentOperation.concat(val);
    output = currentOperation;
  }

  // show input in display 
  display.textContent = output;
})

function getOutput(operation) {
  if (!validateSyntax(operation)) {
    return "SYNTAX ERROR"
  }

  // split string
  const nums = operation
    .split(/[*\/+\-]{1}/)
    .map(num => +num);
  const [operator] = operation.match(/[*\/+\-]{1}/g);
  return operate(...nums, operator)
}

function validateSyntax(str) {
  const operationSyntax = /^\d+(?:\.\d*)?[*\/+\-]{1}\d+(?:\.\d*)?$/gm
  return operationSyntax.test(str)
}