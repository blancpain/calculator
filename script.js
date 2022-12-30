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
  if (a !== undefined && b !== undefined) {
    if (operator === "÷" && b === 0) {
      alert("Come on...You know better than that!");
      reset();
      return;
    }
    currentTotal = operate(operator, a, b);
    results.textContent = `${a} ${operator} ${b} =`;
    display.textContent = currentTotal;
    confirmedNumA = currentTotal;
    initialUserInput = currentTotal;
    confirmedNumB = undefined;
    usedEquals = true;
  } else {
    return;
  }
}

function calculateWithOperator(selectedOperator, e) {
  if (selectedOperator === "÷" && confirmedNumB === 0) {
    alert("Come on...You know better than that!");
    reset();
    return;
  }
  currentTotal = operate(selectedOperator, confirmedNumA, confirmedNumB);
  operator = e.target.textContent;
  results.textContent = `${currentTotal} ${operator}`;
  display.textContent = currentTotal;
  confirmedNumA = currentTotal;
  tempNumberB = confirmedNumB;
  confirmedNumB = undefined;
}

function useOperator(selectedOperator, e) {
  //default to 0 if user hasn't entered "number one" and clicks an operator
  if (confirmedNumA === undefined) {
    confirmedNumA = Number(initialUserInput);
  }
  //to be used in scenario 3 below
  timeStamp2 = e.timeStamp;
  results.textContent = confirmedNumA + " " + selectedOperator;
  if (confirmedNumB === undefined) {
    initialUserInput = "";
    return;
  } else if (
    String(confirmedNumB).includes(".") &&
    usedEquals === true &&
    !String(currentTotal).includes(".")
  ) {
    results.textContent = confirmedNumB + " " + selectedOperator;
    confirmedNumA = confirmedNumB;
    confirmedNumB = undefined;
    initialUserInput = "";
    usedEquals = false;
    return;
  } else if (usedClear === true && usedEquals === true) {
    usedClear = false;
    usedEquals = false;
    operator = e.target.textContent; //as operator is not getting synced - examine further why this is needed
    results.textContent = confirmedNumB + " " + operator;
    confirmedNumA = confirmedNumB;
    confirmedNumB = undefined;
    initialUserInput = "";
    return;
  } else if (currentTotal !== confirmedNumA) {
    //for first time calcs using an operator, we need to make sure there isn't a final result yet
    calculateWithOperator(selectedOperator, e);
  } else if (tempNumberB !== confirmedNumB) {
    //for operator calcs where the user has changed "number 2", "number 1" is now always the "final result" until reset
    calculateWithOperator(selectedOperator, e);
  } else if (tempNumberB == confirmedNumB && timeStamp1 !== timeStamp2) {
    //scenario 3: to catch situations where user has changed "number 2" but it is the same number,
    calculateWithOperator(selectedOperator, e); //in that case we look at the timeStamp of the clicks to differentiate the numbers
  }
  initialUserInput = "";
}

function reset() {
  initialUserInput = "";
  display.textContent = "0";
  results.textContent = "";
  confirmedNumA = undefined;
  confirmedNumB = undefined;
  operator = "";
  usedClear = false;
  usedEquals = false;
}

function clear() {
  usedClear = true;
  display.textContent = display.textContent.substring(
    0,
    display.textContent.length - 1
  );
  initialUserInput = display.textContent;
  if (confirmedNumA !== undefined) {
    confirmedNumB = Number(initialUserInput);
  }
}

const display = document.querySelector("#current_selection");
const results = document.querySelector("#results");
const buttons = document.querySelectorAll("button");
const decimalButton = document.getElementById("decimal");

//variables
let initialUserInput = "";
let tempNumberB;
let confirmedNumA;
let confirmedNumB;
let currentTotal;
let operator;
let usedEquals = false;
let usedClear = false;

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    if (button.className === "number") {
      initialUserInput += button.textContent;
      display.textContent = initialUserInput;
      if (confirmedNumA !== undefined) {
        confirmedNumB = Number(initialUserInput);
        //get timeStamp of initial number 2 assignment
        timeStamp1 = e.timeStamp;
      }
    } else if (button.className === "operator") {
      if (confirmedNumB === undefined) {
        operator = button.textContent;
      }
      useOperator(operator, e);
    } else if (button.className === "AC") {
      reset();
    } else if (button.id === "clear") {
      clear();
    } else if (button.id === "equals") {
      calculateWithEquals(confirmedNumA, confirmedNumB, operator);
    }
    // decimal operator functionality
    else if (button.id == "decimal") {
      if (!display.textContent.includes(".")) {
        initialUserInput += button.textContent;
        display.textContent += button.textContent;
      }
    }
    //BELOW functionality is OPTIONAL.....
    //percentage - to be revised & included
    // else if (button.id === "percentage") {
    //   initialUserInput /= 100;
    //   display.textContent = initialUserInput;
    // }
    //toggle sign - to be revised & included
    // else if (button.id === "toggle_sign") {
    //   if (confirmedNumA === undefined) {
    //     confirmedNumA = -Number(initialUserInput);
    //     display.textContent = confirmedNumA;
    //   } else {
    //     confirmedNumB = -Number(initialUserInput);
    //     display.textContent = confirmedNumB;
    //   }
    // }
  })
);
