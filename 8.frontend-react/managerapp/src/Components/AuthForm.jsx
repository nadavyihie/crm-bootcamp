import React from 'react';
import Input from './Input';
import Button from './Button';
import axios from 'axios';
import {Redirect} from 'react-router-dom';
function AuthForm(props) {
    const authToDatabase=(e)=>{
        e.preventDefault();

        const email=e.target.elements.email.value.trim();
        const password=e.target.elements.password.value.trim();
       
        axios.post('http://localhost:8005/signin',{email,password})
        .then(function (response) {
            
           const {loginCorrect,token}=response.data;
           if(loginCorrect){
             props.regMsg("Login successful");
             props.msgColor('#D4EDDA');
             localStorage.setItem("token",token);
             window.location.reload();
     
            }
            else{
                
               props.regMsg("Username or password is incorrect!");
               props.msgColor('#F8D7DA');
             }
        })

        .catch(function (error) {
          console.log(error);
        });
    
    }

    const saveDetailsOnDatabase=(e)=>{
        e.preventDefault();
        const fullName=e.target.elements.fullName.value.trim();
        const companyName=e.target.elements.companyName.value.trim();
        const phoneNumber=e.target.elements.phoneNumber.value.trim();
        const email=e.target.elements.email.value.trim();
        const password=e.target.elements.password.value.trim();
        let emailExists=false;
        axios.post('http://localhost:8005/signup',{fullName,companyName,phoneNumber,email,password})
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

    let inputs=[];

        if(props.formAction=='register')
        {
            inputs=[
                {inputType:'text',inputName:'fullName', inputString:'Full name'},
                {inputType:'text',inputName:'companyName', inputString:'Company name'},
                {inputType:'text',inputName:'phoneNumber', inputString:'Phone number'},
                {inputType:'email',inputName:'email',inputString:'Email'},
                {inputType:'password',inputName:'password', inputString:'Password'},
                {inputType:'password',inputName:'confirmPassword',inputString:'Confirm password'}
                    
                 ];
        }
        if(props.formAction=='login')
        {
            inputs=[
                {inputType:'email',inputName:'email',inputString:'Email'},
                {inputType:'password',inputName:'password', inputString:'Password'}
                 ];
        }

    const inputsList=inputs.map((value,index)=>
    <Input  key={index} inputType={value.inputType} inputName={value.inputName} inputString={value.inputString}/>);

    return (
        <form className="login-register" onSubmit={(props.formAction=='login')?authToDatabase:saveDetailsOnDatabase}>
            {inputsList}
            <Button buttonText="Sign up" />
        </form>
    );
}

export default AuthForm;