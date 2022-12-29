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
  } else if (operator === "×") {
    return multiply(a, b);
  } else if (operator === "÷") {
    return divide(a, b);
  }
}
//TODO: create an object for the different inputs - number, operator, equals, decimal etc and refer to the relevant functions

let textOfFinalOutcome = "";

function displayResult(a, b, operator) {
  if (
    a !== undefined &&
    b !== undefined &&
    textOfFinalOutcome !== results.textContent
  ) {
    finalResult = operate(operator, a, b);
    results.textContent = `${a} ${operator} ${b} =`;
    display.textContent = finalResult;
    confirmedNumA = finalResult;
    textOfFinalOutcome = results.textContent;
    confirmedNumB = undefined;
  } else {
    return;
  }
}

function useOperator(selectedOperator, e) {
  //default to 0 if user hasn't entered a number and clicks an operator
  timeStamp2 = e.timeStamp;
  console.log(confirmedNumA);
  console.log(finalResult);
  if (confirmedNumA === undefined) {
    confirmedNumA = Number(userInput);
  }
  results.textContent = confirmedNumA + " " + selectedOperator;
  //revise logic below, on second operator press nothing happens.....
  if (confirmedNumB !== undefined && finalResult !== confirmedNumA) {
    finalResult = operate(selectedOperator, confirmedNumA, confirmedNumB);
    results.textContent = `${finalResult} ${operator}`;
    display.textContent = finalResult;
    confirmedNumA = finalResult;
    tempNumberB = confirmedNumB;
    confirmedNumB = undefined;
  } else if (confirmedNumB !== undefined && tempNumberB !== confirmedNumB) {
    finalResult = operate(selectedOperator, confirmedNumA, confirmedNumB);
    results.textContent = `${finalResult} ${operator}`;
    display.textContent = finalResult;
    confirmedNumA = finalResult;
    tempNumberB = confirmedNumB;
    confirmedNumB = undefined;
  } else if (
    confirmedNumB !== undefined &&
    tempNumberB == confirmedNumB &&
    timeStamp1 !== timeStamp2
  ) {
    finalResult = operate(selectedOperator, confirmedNumA, confirmedNumB);
    results.textContent = `${finalResult} ${operator}`;
    display.textContent = finalResult;
    confirmedNumA = finalResult;
    tempNumberB = confirmedNumB;
    confirmedNumB = undefined;
  }
  userInput = "";
}

function clear() {
  userInput = "";
  display.textContent = "0";
  results.textContent = "";
  confirmedNumA = undefined;
  confirmedNumB = undefined;
  operator = "";
}

const display = document.querySelector("#current_selection");
const results = document.querySelector("#results");
const buttons = document.querySelectorAll("button");
const decimalButton = document.getElementById("decimal");

let userInput = "";
let confirmedNumA;
let confirmedNumB;
let tempNumberB;
let finalResult;
let operator;
let timeStamp1;
let timeStamp2;

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (button.className === "number") {
      userInput += button.textContent;
      display.textContent = userInput;
      if (confirmedNumA !== undefined) {
        confirmedNumB = Number(userInput);
        timeStamp1 = e.timeStamp;
      }
    } else if (button.className === "operator") {
      operator = button.textContent;
      useOperator(operator, e);
    } else if (button.className === "C") {
      clear();
    } else if (button.id === "equals") {
      displayResult(confirmedNumA, confirmedNumB, operator);
    } else if (button.id == "decimal") {
      // if (confirmedNumB !== 0 || confirmedNumB !== undefined) {
      // confirmedNumB = 0;
      // }
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
