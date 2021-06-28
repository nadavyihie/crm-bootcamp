import React from 'react';

function Input(props) {
    return (
        <div className="inputContainer">
       <label htmlFor={props.InputName}>{props.inputString}</label>
        <input
            type={props.inputType} 
            name={props.inputName}
            id={props.inputName}
         />
         </div>
    );
}

export default Input;