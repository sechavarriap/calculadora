import React from 'react';

const Button = ({value, method, color, className, displayValue, btnType, pendingChange, memory, setMemory, setPendingChange, setSelectedOperand, setDisplayValue, selectedOperand  }) => {

    const removeChar = () => method(displayValue.substring(0, displayValue.length - 1));
    const calculate = () => {
        
        switch(selectedOperand){
            case '+': 
                setDisplayValue(parseFloat(memory) + parseFloat(displayValue));
                break;
            case '-':
                setDisplayValue(parseFloat(memory) - parseFloat(displayValue));
                break;
            case '*':
                setDisplayValue(parseFloat(memory) * parseFloat(displayValue));
                break;
            case '/':
                setDisplayValue(parseFloat(memory) / parseFloat(displayValue));
                break;
            default: break;
        }
    }

    let methodToUse = () => 5;

    switch (btnType) {
        case 'memory-btn':
            switch (value) {
                case '←':
                    methodToUse = () => removeChar();
                    break;
                case 'C':
                    methodToUse = () => method('');
                    break;
                default: 
                    methodToUse = () => {
                        setMemory(null);
                        method('')
                    };
                    break;
            }
            break;
        case 'number-btn':
            if (pendingChange) {
                methodToUse = () => {
                    setPendingChange(false);
                    setMemory(displayValue);
                    method(value);
                } 
            } else {
                methodToUse = () => method(displayValue + value);
            }
                    
            break;
        default:
            if (value === '=') {
                methodToUse = () => {
                    if (pendingChange === true) {
                        setMemory(null);
                        setSelectedOperand('')                        
                    } else {


                        calculate();
                        setMemory(null);
                        setPendingChange(false);
                        setSelectedOperand('');
                    }

                }
            } else if (memory !== null) {
                methodToUse = () => {
                    calculate();
                    setPendingChange(true);
                    setSelectedOperand(value);
                }
            } else {
                methodToUse = () => {
                    setPendingChange(true);
                    method(value);
                }
            }

            break;
    }

    return (
        <button 
            className={`btn ${color} ${className} ${selectedOperand === value ? 'active-btn' : null}`} 
            onClick={ methodToUse }
        >
            {value}
        </button>
    );
}
 
export default Button;