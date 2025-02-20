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
  divisor == 0
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
  };
};


/**
 * UI Interactivity
 */

const display = document.querySelector(".display")
const btnSection = document.querySelector(".btnSection")

btnSection.addEventListener("click", btn => {
  btn = btn.target;
  
  if (btn.id === "clear") {
    clearDisplay(true);
  } else if (btn.id === "return") {
    clearDisplay(false);
  } else if (btn.id === "evaluate") {
    const out = evaluate(display.value);
    clearDisplay(true);
    appendToDisplay(out);
  } else if (btn.classList.contains("numBtn")
    || btn.classList.contains("operatorBtn")) {
    appendToDisplay(btn.textContent);
  };

  // remove focus from the buttons
  btn.blur();
});

// This might be the most beautiful piece of
// art I've ever made.
function evaluate(expression) {
  let output;
  const regex = /[+\-*/\u00F7\u00D7]/

  const operands = expression
    .split(regex)           // take out the math symbols
    .map(operand => +operand);  // turn the operands into integers

  const operators = expression  // only take in the math symbols
    .split("")
    .filter(char => char.match(regex))
    .map(operator => {
      if (operator == "\u00F7") {
        return "/";
      } else if (operator == "\u00D7") {
        return "*";
      } else {
        return operator;
      };
    });
  
  while (operators.length > 0) {
    let operator = operators.shift();
    output = operate(...operands.splice(0,2), operator);
    operands.unshift(output);
  };
  return output ? roundOff(output) : operands[0];
};

function roundOff(num) {
  if (typeof(num) == "number") {
    return Math.round(num * Math.pow(10, 6)) / Math.pow(10, 6);
  };
  return num;
};


/**
 * KEYBOARD INPUT
 */

document.addEventListener("keydown", e => {
  const key = e.key;
  const regex = /^[+\-/*\u00F7\u00D70-9\.]{1}$/
  if (key.match(regex)) { 
    appendToDisplay(key);
  } else if (key === 'Backspace') {
    clearDisplay(false);
  } else if (key === 'Enter' || key === '=') {
    const out = evaluate(display.value);
    clearDisplay(true);
    appendToDisplay(out);
  };
})


/**
 * DISPLAY-RELATED FUNCTIONS
 */

function appendToDisplay(char) {
  display.value += char;
}

function clearDisplay(all=false) {
  if (all) { display.value = '' }
  else { display.value = display.value.slice(0, -1) };
}