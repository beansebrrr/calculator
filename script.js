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
    case "\u002B":
      return add(num1, num2);
    case "-":
    case "\u2212":
      return subtract(num1, num2);
    case "*":
    case "\u00D7":
      return multiply(num1, num2);
    case "/":
    case "\u00F7":
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
  } else if (
    (btn.classList.contains("numBtn") || btn.classList.contains("operatorBtn"))
    && display.value.length < 10) {
    appendToDisplay(btn.textContent);
  };

  // remove focus from the buttons
  btn.blur();
});

// This might be the most beautiful piece of
// art I've ever made.
function evaluate(expression) {
  let output;

  // regex of mathematical operators
  const acceptedOperators = /[+\-*/\u2122\u002B\u00F7\u00D7]/

  const operands = expression
    .split(acceptedOperators)
    .map(operand =>                   
      operand.slice(-1) == "%"
      ? operand = (+operand.slice(0, -1)) / 100   // This part converts percentages into decimal formats.
      : +operand  // Since the expression started off as a string, I do
  );              // have to set its data type to Number.

  const operators = expression
    .split("")
    .filter(char => char.match(acceptedOperators));
  
  // Operates on the math expression left-to-right
  while (operators.length > 0) {
    let operator = operators.shift();
    output = operate(...operands.splice(0,2), operator);
    operands.unshift(output);
  };

  return output ? roundOff(output) : operands[0];
};

function roundOff(num) {
  // There's a special case where the calculator purposefully outputs a string, and
  // if that's the case, I made sure this will just return the string as is.
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

  // regex for numbers, math operators, ".", and "%".
  const acceptedChars = /^[+\-/*\u2212\u002B\u00F7\u00D70-9\.%]{1}$/ 
  
  if (key.match(acceptedChars) && display.value.length < 10) { 
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