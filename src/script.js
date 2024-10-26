import React from "https://esm.sh/react";
import ReactDOM from "https://esm.sh/react-dom";

function Calculator() {
  const [display, setDisplay] = React.useState("0");
  const [input, setInput] = React.useState("");

  // Helper function to update the input and display
  const updateInput = (newInput) => {
    setInput(newInput);
    setDisplay(newInput || "0"); // Show "0" if input is empty
  };

  // Helper function to handle input (digits and operators)
  const handleInput = (value) => {
    const isOperator = /[\+\*\/]/.test(value);

    // Handle operator input
    if (isOperator) {
      // Replace the last operator with the current one if it's an operator
      if (/[\+\*\/]$/.test(input)) {
        updateInput(input.slice(0, -1) + value);
      } else if (/[\+\*\/]-$/.test(input)) {
        // If there's a negative sign after an operator, allow it
        updateInput(input + value);
      } else {
        updateInput(input + value);
      }
    } else if (value === "-") {
      // Allow "-" after an operator or at the start
      if (input === "" || /[\+\*\/]$/.test(input)) {
        updateInput(input + value);
      } else {
        updateInput(input + value);
      }
    } else {
      // Handle number input and zero leading
      if (input === "0" && value !== ".") {
        updateInput(value);
      } else {
        updateInput(input + value);
      }
    }
  };

  // Clear the display and input
  const clearDisplay = () => {
    updateInput("");
  };

  // Handle decimal input
  const handleDecimal = () => {
    const lastNumber = input.split(/[\+\-\*\/]/).pop();
    if (!lastNumber.includes(".")) {
      updateInput(input + ".");
    }
  };

  // Perform calculation
const calculateResult = () => {
  try {
    // Sanitize the input to handle cases like "5*-5" correctly
    let sanitizedInput = input
      .replace(/--/g, "+") // Replace double negatives with a plus
      .replace(/([+\-*\/])-(\d+)/g, "$1*(-$2)") // Treat negative numbers properly
      .replace(/([+\-*\/]){2,}/g, (match) => match.slice(-1)); // Keep only the last operator in consecutive operators

    // Evaluate the sanitized input
    const result = eval(sanitizedInput); // Evaluate the sanitized input
    updateInput(result.toString()); // Update the input with the result
  } catch {
    setDisplay("Error"); // Handle errors by displaying "Error"
    updateInput(""); // Clear the input
  }
};






  // Handle zero input to prevent leading zeros
  const handleZero = () => {
    if (input !== "0") {
      updateInput(input + "0");
    }
  };

  return (
    <div className="calculator">
      <div id="display">{display}</div>
      <div className="buttons">
        <button id="clear" onClick={clearDisplay}>AC</button>
        <button id="divide" onClick={() => handleInput("/")}>/</button>
        <button id="multiply" onClick={() => handleInput("*")}>*</button>
        <button id="subtract" onClick={() => handleInput("-")}>-</button>
        <button id="seven" onClick={() => handleInput("7")}>7</button>
        <button id="eight" onClick={() => handleInput("8")}>8</button>
        <button id="nine" onClick={() => handleInput("9")}>9</button>
        <button id="add" onClick={() => handleInput("+")}>+</button>
        <button id="four" onClick={() => handleInput("4")}>4</button>
        <button id="five" onClick={() => handleInput("5")}>5</button>
        <button id="six" onClick={() => handleInput("6")}>6</button>
        <button id="one" onClick={() => handleInput("1")}>1</button>
        <button id="two" onClick={() => handleInput("2")}>2</button>
        <button id="three" onClick={() => handleInput("3")}>3</button>
        <button id="equals" onClick={calculateResult}>=</button>
        <button id="zero" onClick={handleZero}>0</button>
        <button id="decimal" onClick={handleDecimal}>.</button>
      </div>
    </div>
  );
}

ReactDOM.render(<Calculator />, document.getElementById('app'));






