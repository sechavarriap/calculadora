import React from 'react';
import '../App.css';

const Display = ({displayValue, setDisplayValue}) => {
    return (
        <div className="Display">
                {displayValue}
        </div>        
    );
}
 
export default Display;