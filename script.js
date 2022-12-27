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
const decimalButton = document.getElementById("decimal");

let userInput = "";
let confirmedNumA;
let confirmedNumB;
let finalResult;
let operator;

buttons.forEach((button) =>
  button.addEventListener("click", () => {
    if (button.className === "number") {
      userInput += button.textContent;
      display.textContent = userInput;
    } else if (button.className === "operator") {
      operator = button.textContent;
      if (typeof confirmedNumA === "undefined") {
        results.textContent = userInput + " " + button.textContent;
        confirmedNumA = Number(userInput);
      } else {
        results.textContent = `${confirmedNumA} ${operator}`;
        confirmedNumB = Number(userInput);
      }
      userInput = "";
    } else if (button.className === "C") {
      userInput = "";
      display.textContent = "0";
      results.textContent = "";
      confirmedNumA = undefined;
      confirmedNumB = undefined;
      operator = undefined;
    } else if (button.id === "equals") {
      confirmedNumB = Number(userInput);
      if (
        typeof confirmedNumA !== "undefined" &&
        typeof confirmedNumB !== "undefined"
      ) {
        finalResult = operate(operator, confirmedNumA, confirmedNumB);
        results.textContent = `${confirmedNumA} ${operator} ${confirmedNumB} =`;
        display.textContent = finalResult;
        confirmedNumA = finalResult;
        confirmedNumB = 0;
      }
    } else if (button.id == "decimal") {
      if (confirmedNumB !== 0 || confirmedNumB !== undefined) {
        confirmedNumB = 0;
      }
      if (!String(confirmedNumA).includes(".") && !userInput.includes(".")) {
        userInput += button.textContent;
        display.textContent += button.textContent;
      } else if (
        !String(confirmedNumB).includes(".") &&
        !userInput.includes(".")
      ) {
        userInput += button.textContent;
        display.textContent += button.textContent;
      }
    }
    // else if (button.id === "percentage") {
    //   confirmedNumA = Number(userInput) / 100;
    //   display.textContent = confirmedNumA;
    // }
    // else if (button.id === "toggle_sign") {
    //   if (typeof confirmedNumA === "undefined") {
    //     confirmedNumA = -Number(userInput);
    //     display.textContent = confirmedNumA;
    //   } else {
    //     confirmedNumB = -Number(userInput);
    //     display.textContent = confirmedNumB;
    //   }
    // }
  })
);
