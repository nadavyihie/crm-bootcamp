import React from 'react';
import Signup from '../Pages/Signup';
import './css/choiceContainer-style.css'

function ChoiceContainer(props) {
    return (
        <div className="choiceContainer">
            <div className="container-item" onClick={props.showLogBox}>Sign in</div>
            <div className="container-item" onClick={props.showRegBox}>Sign up</div>
        </div>
    );
}

export default ChoiceContainer;