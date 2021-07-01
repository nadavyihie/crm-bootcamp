import React from 'react';
import '../css/auth.css'
function SignIn(props) {
    
    return (
        <div className="authPage">
           <Form inputs={inputs} submitAction={submitAction} buttonText={buttonText}/>
        </div>
    );
}

export default SignIn;