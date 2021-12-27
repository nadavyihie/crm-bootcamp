import React, { useEffect, useState } from 'react';
import './css/resetPassword-style.css'
import axios from 'axios';
import Form from '../../Components/Form/Form.component';
import { useParams } from 'react-router-dom';
import Loading from '../../Components/Loading/Loading';
function ResetPassword(props) {
    
    const {token}=useParams();
  
    const [email,setEmail]=useState("");
    const [validToken,setValidToken]=useState(true);
    const [loading,setLoading]=useState(true);
    const [submitMsg,setSubmitMsg]=useState(["",""]); 

    useEffect(()=>{
        console.log(token);
        axios.get('http://localhost:8005/users/validateLink', {
          headers: {
            'token': token
    
          }
        })
        .then(function (response) {
            
          
            console.log(response.data.email)
            setEmail(response.data.email);
  
            
        })
        .catch(function (error) {
          setValidToken(false);
          
        });
      
    
        setLoading(false);
      
      },[])

    const submitAction=(e)=>{
      setLoading(true);

            e.preventDefault();
     
            const password=e.target.elements.password.value.trim();
            axios.post('http://localhost:8005/users/resetpassword',{email,password})
                 .then(function (response) {
                
                    setSubmitMsg(["you password has been reset!","#D4EDDA"]);
             
    
                
            })
            .catch(function (error) {
                
                setSubmitMsg(["Can not reset password,please try again later","#F8D7DA"]);
            });
            setLoading(false);
            
            
         
        
    }
    if (loading) {
        return <Loading/>;
      }
      if(!validToken){
          window.location.href="/";
      }
    const inputs = 
   [ { inputType: "password", inputName: "password", inputString: "password" }]


    return (
        <div className="authPage">
             <div className="submitMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>
            <span className="Title">Enter your new password:</span>
        
             <Form
          formStyle="loginForm"
          inputs={ inputs}
          submitAction={submitAction}
          buttonText="Reset"
        />
       
        </div>
    );
}

export default ResetPassword;