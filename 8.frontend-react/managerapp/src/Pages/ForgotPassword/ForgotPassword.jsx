import React, { useState } from 'react';
import Form from '../../Components/Form/Form.component';
import "../css/auth.css";
import "./css/forgotPassword-style.css";
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
function ForgotPassword(props) {
    const [submitMsg,setSubmitMsg]=useState(["",""]); 
    const[loading,setLoading]=useState(false);
    const submitAction=(e)=>{
            setLoading(true);

            e.preventDefault();
            const email=e.target.elements.email.value.trim();
            axios.post('http://localhost:8005/users/forgotpassword',{email})
                 .then(function (response) {
                
                    setSubmitMsg(["We send you an email!","#D4EDDA"]);
             
    
                
            })
            .catch(function (error) {
                
                setSubmitMsg(["This Email is not exists","#F8D7DA"]);
            });
            
            setLoading(false);
         
        
    }

    const inputs = 
   [ { inputType: "text", inputName: "email", inputString: "Email" }]

   if(loading){
       <Loading/>
   }
    return (
        <div className="authPage">
             <div className="submitMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>
            <span className="Title">Enter your email address:</span>
        
             <Form
          formStyle="loginForm"
          inputs={ inputs}
          submitAction={submitAction}
          buttonText="Send"
        />
       
        </div>
    );
}

export default ForgotPassword;