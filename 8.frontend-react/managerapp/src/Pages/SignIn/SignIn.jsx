import React, { useEffect, useState } from "react";
import Form from "../../Components/Form/Form.component";
import {createInput,createArrFromInputs} from "./scripts/script";
import "./css/signin-style.css";
import "../css/auth.css";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
  useParams,
} from "react-router-dom";

function SignIn(props) {
  
  const  {token}  = useParams();
  console.log(token);
  const [submitMsg,setSubmitMsg]=useState(["",""]);

  const submitAction = (e) => {


    const inputs=createArrFromInputs(e,props.signAction);
   
   if(props.signAction=='signup'){
    axios.post("http://localhost:8005/users/signup", inputs)
    .then(function (response) {
      if(response.status==200){
        setSubmitMsg(["Registration successful","#D4EDDA"]);
      }
    })
    .catch(function (error) {
       
      if(error.response.status==400){
        setSubmitMsg(["This Email is already exists","#F8D7DA"]);
      }
    });
  }

  if(props.signAction=='invited'){
    console.log(token);
    axios.post("http://localhost:8005/users/signup", {inputs,token})
    .then(function (response) {
      if(response.status==200){
        setSubmitMsg(["Registration successful","#D4EDDA"]);
      }
    })
    .catch(function (error) {
       
      if(error.response.status==400){
        setSubmitMsg(["This Email is already exists","#F8D7DA"]);
      }
    });
  }

  if(props.signAction=='signin'){
    axios.post("http://localhost:8005/users/signin", inputs)
    .then(function (response) {
      if(response.status==200){
        setSubmitMsg(["login succeess","#D4EDDA"]);
        localStorage.setItem("token", response.data);
        window.location.href="/";
      }
    })
    .catch(function (error) {
       console.log(error)
      if(error.response.status==400)
        setSubmitMsg(["Email or password is incorrect","#F8D7DA"]);
      
    });
  }
  
  }
    
  const inputs = createInput(props.signAction);

  return (
    <div className="authPage">
      <div className="submitMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>
      <span className="signinTitle">{props.signAction=="signin"?"Sign In":"Sign Up"}</span>
      <div className="formContainer">
        <Form
          formStyle="loginForm"
          inputs={inputs}
          submitAction={submitAction}
          buttonText={props.signAction=='signin'?"Sign In":"Sign Up"}
        />
        {props.signAction=='signin'?
        <Link className="forgotPass" to="/forgotpassword">
          Forgot your password?
        </Link>
        :<br></br>}
        <div className="signupContainer">
          <span className="signupMsg">{props.signAction=='signin'?"Dont have an account?":"Already have an account?"}</span>
          <Link className="signupLink" to={props.signAction=='signin'?"/signup":"/login"}>
            {props.signAction=='signin'?"Sign Up":"Sign In"}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default SignIn;
