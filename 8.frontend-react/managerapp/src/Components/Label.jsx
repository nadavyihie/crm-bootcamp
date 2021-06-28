import React from 'react';

function Label(props) {
    return (
        <label htmlFor={props.inputName}>{props.labelValue}</label>
    );
}

export default Label;