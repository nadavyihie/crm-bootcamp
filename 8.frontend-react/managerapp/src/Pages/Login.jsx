import React, { useState } from 'react';
import Input from '../Components/Input';
import Button from '../Components/Button';
import NavBar from '../Components/NavBar';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './css/homepage-style.css'
function Login(props) {
    const [option,setOption]=useState("");


    const sendInvitation=(e)=>
    {
        const managerName=props.userName
        
        e.preventDefault();
        const email=e.target.elements.email.value.trim();
        axios.post('http://localhost:8005/users/inviteuser',{managerName,email})
             .then(function (response) {
            
           alert(response.data.message);
         

            
        })
        .catch(function (error) {
          alert(error.response.data.message);          
        });
        
        
     
    }

    const logOut=()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }
    const createUser=()=>{
        setOption("createUser")
    }
    return (
        <div className='homepage'>
     
     <div className='topNav'>  
                     <Link to='createuser' className="topNavItem" onClick={createUser}>create user</Link>
                     <div className="topNavItem" >option</div>
                     <div className="topNavItem" >option </div>
                     <div className="topNavItem" >option </div>
                </div>
            <div className="logout" onClick={logOut}>Sign out</div>  
                <div className='username'>Hi, {props.userName}</div>
               
            {option=='createUser'?<div>
            <form onSubmit={sendInvitation}>
              <Input  inputType="text" inputName="email" inputString="Email"/>
            <Button buttonText="send"/>        </form>
            </div>:null}
        </div>
    );
}

export default Login;