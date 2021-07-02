import React from "react";
import Form from "../../Components/Form/Form.component";
import createInput from "./scripts/createInputArr";
import "./css/signin-style.css";
import "../css/auth.css";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

function SignIn(props) {

  const submitAction = () => {};

  const inputs = createInput(props.signAction);

  return (
    <div className="authPage">
      <span className="signinTitle">{props.signAction=="signin"?"Sign In":"Sign Up"}</span>
      <div className="formContainer">
        <Form
          formStyle="loginForm"
          inputs={inputs}
          submitAction={submitAction}
          buttonText={props.signAction=='signin'?"Sign In":"Sign Up"}
        />
        {props.signAction=='signin'?
        <Link className="forgotPass" to="bla">
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
