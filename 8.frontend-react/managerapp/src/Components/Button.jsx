import React from 'react';
import './css/button.css';
function Button(props) {
    return (
        <button className="button" type={props.buttonType} >{props.buttonText} </button>
    );
}

export default Button;