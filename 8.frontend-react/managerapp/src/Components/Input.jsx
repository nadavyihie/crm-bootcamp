import React from 'react';

function Input(props) {
    return (
        <div className="inputContainer">
       {/* <label htmlFor={props.InputName}>{props.inputString}</label> */}
        <input className="inputstyle"
            type={props.inputType} 
            name={props.inputName}
            id={props.inputName}
            autocomplete="off"
            placeholder={props.inputString}
         />
         </div>
    );
}

export default Input;