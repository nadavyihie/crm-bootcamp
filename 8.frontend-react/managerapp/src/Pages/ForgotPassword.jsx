import React from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';
import axios from 'axios';
function ForgotPassword(props) {

    const sendResetPassword=(e)=>
    {
        e.preventDefault();
        const email=e.target.elements.email.value.trim();
        axios.post('http://localhost:8005/users/forgotpassword',{email})
        .then(function (response) {
           let emailExists=response.data.emailExists;
           console.log(emailExists);
           if(emailExists){
             
             alert("We sent you an mail");
             
            }
            else{
                
               alert("The email address is not exists");
           
             }
        })
    }

    return (
        <form onSubmit={sendResetPassword}>
              <Input  inputType="text" inputName="email" inputString="Email"/>
            <Button buttonText="send"/>        </form>
    );
}

export default ForgotPassword;