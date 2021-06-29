import React, { useState } from 'react';
import Signup from '../Pages/Signup';
import './css/choiceContainer-style.css'

function ChoiceContainer(props) {
    const [signInHighlight,setSignInHighlight]=useState(true);
    const showLogBox=()=>{
        setSignInHighlight(true);
        props.showLogBox();
    }
    const showRegBox=()=>{
        setSignInHighlight(false);
        props.showRegBox();
    }
    return (
        <div className="choiceContainer">
            <div className={signInHighlight?"container-item-chosen":"container-item"} onClick={showLogBox}>Sign In</div>
            <div className={!signInHighlight?"container-item-chosen":"container-item"} onClick={showRegBox}>Sign Up</div>
        </div>
    );
}

export default ChoiceContainer;