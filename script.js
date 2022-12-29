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

function calculateWithEquals(a, b, operator) {
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

function calculateWithOperator(selectedOperator, e) {
  finalResult = operate(selectedOperator, confirmedNumA, confirmedNumB);
  operator = e.target.textContent;
  results.textContent = `${finalResult} ${operator}`;
  display.textContent = finalResult;
  confirmedNumA = finalResult;
  tempNumberB = confirmedNumB;
  confirmedNumB = undefined;
}

function useOperator(selectedOperator, e) {
  //default to 0 if user hasn't entered "number one" and clicks an operator
  if (confirmedNumA === undefined) {
    confirmedNumA = Number(userInput);
  }
  //to be used in scenario 3 below
  timeStamp2 = e.timeStamp;
  results.textContent = confirmedNumA + " " + selectedOperator;
  if (confirmedNumB === undefined) {
    userInput = "";
    return;
  } else if (finalResult !== confirmedNumA) {
    //for first time calcs using an operator, we need to make sure there isn't a final result yet
    calculateWithOperator(selectedOperator, e);
  } else if (tempNumberB !== confirmedNumB) {
    //for operator calcs where the user has changed "number 2", "number 1" is now always the "final result" until reset
    calculateWithOperator(selectedOperator, e);
  } else if (tempNumberB == confirmedNumB && timeStamp1 !== timeStamp2) {
    //scenario 3: to catch situations where user has changed "number 2" but it is the same number,
    calculateWithOperator(selectedOperator, e); //in that case we look at the timeStamp of the clicks to differentiate the numbers
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

//variables
let textOfFinalOutcome = "";
let userInput = "";
let confirmedNumA;
let confirmedNumB;
let tempNumberB;
let finalResult;
let operator;

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
      if (confirmedNumB === undefined) {
        operator = button.textContent;
      }
      useOperator(operator, e);
    } else if (button.className === "C") {
      clear();
    } else if (button.id === "equals") {
      calculateWithEquals(confirmedNumA, confirmedNumB, operator);
    } else if (button.id == "decimal") {
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
    //   if (confirmedNumA === undefined) {
    //     confirmedNumA = -Number(userInput);
    //     display.textContent = confirmedNumA;
    //   } else {
    //     confirmedNumB = -Number(userInput);
    //     display.textContent = confirmedNumB;
    //   }
    // }
  })
);
