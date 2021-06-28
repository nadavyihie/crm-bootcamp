import React from 'react';
import './css/box-style.css'
import Input from './Input';
import Label from './Label';
import Button from './Button';
function LoginBox(props) {
    return (
        <div className="login-register">

            <div className="inputContainer">
                <Label inputName="email" labelValue="Email"/>
                <Input inputType="email" inputName="email" />
            </div>
            
            <div className="inputContainer">
                 <Label inputName="password" labelValue="Password"/>
                <Input inputType="password" inputName="password" />
            </div>

            <Button buttonType="submit" buttonText="Sign in"/>
        </div>
    );
}

export default LoginBox;