import React, { useState } from 'react';

function Input(props) {
    const [err,setErr]=useState("");
    const handleChange=()=>
    {
        switch(props.input.type)
        {
            case 'userName':
                break;
        }
    }

    return (
        <div className="inputContainer">
       {/* <label htmlFor={props.InputName}>{props.inputString}</label> */}
        <input className="inputstyle"
            type={props.inputType} 
            name={props.inputName}
            id={props.inputName}
            autocomplete="off"
            placeholder={props.inputString}
            onChange={handleChange}
         />
         <span>{err}</span>
         </div>
    );
}

export default Input;