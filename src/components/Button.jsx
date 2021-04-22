import React from "react";

const Button = ({
  value,
  method,
  color,
  className,
  displayValue,
  btnType,
  pendingChange,
  memory,
  setMemory,
  setPendingChange,
  setSelectedOperand,
  setDisplayValue,
  selectedOperand,
}) => {
  const removeChar = () =>
    method(displayValue.substring(0, displayValue.length - 1));
  const calculate = () => {
    switch (selectedOperand) {
      case "+":
        setDisplayValue(parseFloat(memory) + parseFloat(displayValue));
        break;
      case "-":
        setDisplayValue(parseFloat(memory) - parseFloat(displayValue));
        break;
      case "*":
        setDisplayValue(parseFloat(memory) * parseFloat(displayValue));
        break;
      case "/":
        if (parseFloat(memory) / parseFloat(displayValue) === Infinity) {
          setDisplayValue(NaN);
        } else {
          setDisplayValue(parseFloat(memory) / parseFloat(displayValue));
        }
        break;
      default:
        break;
    }
  };

  let methodToUse = () => 5;

  switch (btnType) {
    case "memory-btn":
      switch (value) {
        case "←":
          methodToUse = () => removeChar();
          break;
        case "C":
          methodToUse = () => method("0");
          break;
        default:
          methodToUse = () => {
            setMemory(null);
            method("0");
          };
          break;
      }
      break;
    case "number-btn":
      if (String(displayValue).length < 15 | pendingChange) {
        if (pendingChange) {
          methodToUse = () => {
            setPendingChange(false);
            setMemory(displayValue);
            method(value);
          };
        } else {
          if (String(displayValue).includes(".") & (value === ".")) {
            methodToUse = () => null;
          } else {
            if (
              (displayValue === "0") |
              (parseFloat(displayValue) === 0 & displayValue !== '0.') |
              isNaN(displayValue)
            ) {
              if (
                ((displayValue === "0") | (parseFloat(displayValue) === 0)) &
                (value === ".")
              ) {
                methodToUse = () => method(displayValue + value);
              } else {
                if (value === "00"){
                  methodToUse = () => method(0);
                } else {
                  methodToUse = () => method(value);
                }
              }
            } else {
              methodToUse = () => method(displayValue + value);
            }
          }
        }
      }
      break;
    default:
      if (value === "=") {
        methodToUse = () => {
          if (pendingChange === true) {
            setMemory(null);
            setSelectedOperand("");
          } else {
            calculate();
            setMemory(null);
            setPendingChange(false);
            setSelectedOperand("");
          }
        };
      } else if (memory !== null & !isNaN(memory)) {
        methodToUse = () => {
          calculate();
          setMemory(null);
          setPendingChange(true);
          setSelectedOperand(value);
        };
      } else {
        methodToUse = () => {
          setPendingChange(true);
          method(value);
        };
      }

      break;
  }

  return (
    <button
      className={`btn ${color} ${className} ${
        selectedOperand === value ? "active-btn" : null
      }`}
      onClick={methodToUse}
    >
      {value}
    </button>
  );
};

export default Button;
