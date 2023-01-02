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
  } else if (operator === "×" || operator === "*") {
    return multiply(a, b);
  } else if (operator === "÷" || operator === "/") {
    return divide(a, b);
  }
}

function calculateWithEquals(a, b, operator) {
  if (a !== undefined && b !== undefined) {
    if ((operator === "÷" || operator === "/") && b === 0) {
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
  if (
    (selectedOperator === "÷" || selectedOperator === "/") &&
    confirmedNumB === 0
  ) {
    alert("Come on...You know better than that!");
    reset();
    return;
  }
  currentTotal = operate(selectedOperator, confirmedNumA, confirmedNumB);
  operator = e.key === undefined ? e.target.textContent : e.key;
  results.textContent = `${currentTotal} ${operator}`;
  display.textContent = currentTotal;
  confirmedNumA = currentTotal;
  tempNumberB = confirmedNumB;
  confirmedNumB = undefined;
}

function useOperator(selectedOperator, e) {
  console.log(
    `A: ${confirmedNumA}; B: ${confirmedNumB}' currentTotal: ${currentTotal}`
  );
  //number A defaults to 0 if user hasn't entered "number one" and clicks an operator
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
    operator = e.key === undefined ? e.target.textContent : e.key; //to get the actual value of the operator otherwise reverts to last use - check why this is (aslo applies to block below)
    results.textContent = confirmedNumB + " " + operator;
    confirmedNumA = confirmedNumB;
    confirmedNumB = undefined;
    initialUserInput = "";
    usedEquals = false;
    usedClear = false;
    return;
  } else if (usedClear === true && usedEquals === true) {
    usedClear = false;
    usedEquals = false;
    operator = e.key === undefined ? e.target.textContent : e.key;
    results.textContent = confirmedNumB + " " + operator;
    confirmedNumA = confirmedNumB;
    confirmedNumB = undefined;
    initialUserInput = "";
    return;
  } else if (usedEquals === true && confirmedNumB !== undefined) {
    usedEquals = false;
    operator = e.key === undefined ? e.target.textContent : e.key;
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

const display = document.querySelector("#main_display");
const results = document.querySelector("#results");
const buttons = document.querySelectorAll("button");
//variables
const numberButtons = [];
for (let index = 0; index < 10; index++) {
  numberButtons.push(index);
}
const operators = {
  "+": "+",
  "-": "-",
  "*": "*",
  "/": "/",
};
let initialUserInput = "";
let tempNumberB;
let confirmedNumA;
let confirmedNumB;
let currentTotal;
let operator;
let usedEquals = false;
let usedClear = false;

function listenForKeyboardPresses(e) {
  //for Arrays "in" actually checks if there are corresponding indices in the array not the numbers themselves...
  if (String(e.key) in numberButtons) {
    initialUserInput += e.key;
    display.textContent = initialUserInput;
    if (confirmedNumA !== undefined) {
      confirmedNumB = Number(initialUserInput);
      //get timeStamp of initial number 2 assignment
      timeStamp1 = e.timeStamp;
    }
  } else if (String(e.key) in operators) {
    if (confirmedNumB === undefined) {
      operator = e.key;
    }
    useOperator(operator, e);
  } else if (e.key === "Escape") {
    reset();
  } else if (e.key === "Backspace") {
    clear();
  } else if (e.key === "=" || e.key === "Enter") {
    calculateWithEquals(confirmedNumA, confirmedNumB, operator);
  }
  // decimal operator functionality
  else if (e.key == ".") {
    if (!display.textContent.includes(".")) {
      initialUserInput += ".";
      display.textContent += ".";
    }
  }
}

function listenForClicks(e) {
  if (e.target.className === "number") {
    initialUserInput += e.target.textContent;
    display.textContent = initialUserInput;
    if (confirmedNumA !== undefined) {
      confirmedNumB = Number(initialUserInput);
      //get timeStamp of initial number 2 assignment
      timeStamp1 = e.timeStamp;
    }
  } else if (e.target.className === "operator") {
    if (confirmedNumB === undefined) {
      operator = e.target.textContent;
    }
    useOperator(operator, e);
  } else if (e.target.className === "AC") {
    reset();
  } else if (e.target.id === "clear") {
    clear();
  } else if (e.target.id === "equals") {
    calculateWithEquals(confirmedNumA, confirmedNumB, operator);
  }
  // decimal operator functionality
  else if (e.target.id == "decimal") {
    if (!display.textContent.includes(".")) {
      initialUserInput += e.target.textContent;
      display.textContent += e.target.textContent;
    }
  }
}

document.addEventListener("keydown", (e) => {
  listenForKeyboardPresses(e);
});

buttons.forEach((button) =>
  button.addEventListener("click", (e) => {
    listenForClicks(e);
  })
);

//BELOW functionality is OPTIONAL (logic same as decimal/delete functionality)...

//percentage
// else if (e.target.id === "percentage") {
//   initialUserInput /= 100;
//   display.textContent = initialUserInput;
// }
//toggle sign
// else if (e.target.id === "toggle_sign") {
//   if (confirmedNumA === undefined) {
//     confirmedNumA = -Number(initialUserInput);
//     display.textContent = confirmedNumA;
//   } else {
//     confirmedNumB = -Number(initialUserInput);
//     display.textContent = confirmedNumB;
//   }
// }
