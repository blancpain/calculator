function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  return a / b;
}

function operate(operator, a, b) {
  if (operator === "+") {
    return add(a, b);
  } else if (operator === "-") {
    return subtract(a, b);
  } else if (operator === "*") {
    return multiply(a, b);
  } else if (operator === "/") {
    return divide(a, b);
  }
}

const display = document.querySelector("#current_selection");
const results = document.querySelector("#results");
const buttons = document.querySelectorAll("button");

let userInput = "";
let confirmedNumA;
let confirmedNumB;
let operator;

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.className === "number") {
      userInput += button.textContent;
      display.textContent = userInput;
    } else if (button.className === "operator") {
      results.textContent = userInput + " " + button.textContent;
      operator = button.textContent;
      if (typeof confirmedNumA === "undefined") {
        confirmedNumA = Number(userInput);
      } else {
        confirmedNumB = Number(userInput);
      }
      userInput = "";
    } else if (button.className === "C") {
      userInput = "";
      display.textContent = "0";
      results.textContent = "";
      confirmedNumA = undefined;
      confirmedNumB = undefined;
    } else if (button.id === "equals") {
      confirmedNumB = Number(userInput);
      if (
        typeof confirmedNumA !== "undefined" &&
        typeof confirmedNumB !== "undefined"
      ) {
        let finalResult = operate(operator, confirmedNumA, confirmedNumB);
        results.textContent = `${confirmedNumA} ${operator} ${confirmedNumB}  =`;
        display.textContent = finalResult;
        confirmedNumA = finalResult;
        confirmedNumB = undefined;
      }
    }
  })
);
