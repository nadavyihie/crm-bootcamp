import React, { useState } from 'react';
import axios from 'axios'
import Label from './Label';
import Input from './Input';
import Button from './Button';
import './css/box-style.css'
import './css/input-style.css'

function RegisterBox(props) {

   
    const saveDetailsOnDatabase=(e)=>{
        e.preventDefault();
        const fullName=e.target.elements.fullName.value.trim();
        const companyName=e.target.elements.companyName.value.trim();
        const phoneNumber=e.target.elements.phoneNumber.value.trim();
        const email=e.target.elements.email.value.trim();
        const password=e.target.elements.password.value.trim();
        let emailExists=false;
        axios.post('http://localhost:8005/register',{fullName,companyName,phoneNumber,email,password})
        .then(function (response) {
           emailExists=response.data.emailExists;
           console.log(emailExists);
           if(!emailExists){
             
             props.regMsg("Registration successful");
             props.msgColor('#D4EDDA');
            }
            else{
                
               props.regMsg("the username already exists!");
               props.msgColor('#F8D7DA');
             }
        })

        .catch(function (error) {
          console.log(error);
        });
    

    }

    const inputs=[
        {inputType:'text',inputName:'fullName', inputString:'Full name'},
        {inputType:'text',inputName:'companyName', inputString:'Company name'},
        {inputType:'text',inputName:'phoneNumber', inputString:'Phone number'},
        {inputType:'email',inputName:'email',inputString:'Email'},
        {inputType:'password',inputName:'password', inputString:'Password'},
        {inputType:'password',inputName:'confirmPassword',inputString:'Confirm password'}
       
    ];
    
       
        const inputsList=inputs.map((value)=>
            <Input  inputType={value.inputType} inputName={value.inputName} inputString={value.inputString}/>);
       
    return (

        
        <form className="login-register" onSubmit={saveDetailsOnDatabase}>
            {inputsList}
            <Button buttonText="Sign up" />
        </form>
    );
}

export default RegisterBox;