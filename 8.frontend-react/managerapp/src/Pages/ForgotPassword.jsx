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
            
           alert(response.data.message);
         

            
        })
        .catch(function (error) {
          setSubmitMsg(["This Email is already exists","#F8D7DA"]);       
        });
        
        
     
    }

    return (
        <form onSubmit={sendResetPassword}>
              <Input  inputType="text" inputName="email" inputString="Email"/>
            <Button buttonText="send"/>        </form>
    );
}

export default ForgotPassword;