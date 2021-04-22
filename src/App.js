import "./App.css";
import Display from "./components/Display";
import Button from "./components/Button";
import { useState } from "react";

function App() {
  const memories = ["C", "AC", "←"];
  const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", ","];
  const operands = ["+", "-", "*", "/", "="];

  const [displayValue, setDisplayValue] = useState("");
  const [selectedOperand, setSelectedOperand] = useState("");
  const [pendingChange, setPendingChange] = useState(false);
  const [memory, setMemory] = useState(null);

  return (
    <div className="App">
      <header className="App-header">
        <p className="App-title">React calculator</p>
      </header>
      <div className="App-body">
        <div className="container container-display">
          <Display
            displayValue={displayValue}
            setDisplayValue={setDisplayValue}
          />
        </div>
        <div className="container container-pad">
          <div className="container container-numpad">
            {memories.map((memory) => (
              <Button
                key={memory}
                value={memory}
                color="btn-light"
                className="btn-numpad"
                displayValue={displayValue}
                method={setDisplayValue}
                btnType="memory-btn"
                setMemory={setMemory}
              />
            ))}

            {numbers.map((number) => (
              <Button
                key={number}
                value={number}
                color="btn-secondary"
                className="btn-numpad"
                displayValue={displayValue}
                method={setDisplayValue}
                btnType="number-btn"
                pendingChange={pendingChange}
                memory={memory}
                setPendingChange={setPendingChange}
                setMemory={setMemory}
                setSelectedOperand={setSelectedOperand}
              />
            ))}
          </div>
          <div className="container container-operands">
            {operands.map((operand) => (
              <Button
                key={operand}
                value={operand}
                method={setSelectedOperand}
                color="btn-warning"
                className="btn-oppad"
                btnType="operand-btn"
                setPendingChange={setPendingChange}
                setDisplayValue={setDisplayValue}
                setMemory={setMemory}
                memory={memory}
                selectedOperand={selectedOperand}
                displayValue={displayValue}
                setSelectedOperand={setSelectedOperand}
                pendingChange={pendingChange}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
