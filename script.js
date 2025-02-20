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

const operate = (num1, operator, num2) => {
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