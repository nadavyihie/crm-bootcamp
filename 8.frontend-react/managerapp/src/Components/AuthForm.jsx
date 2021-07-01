import React, { useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
function AuthForm(props) {
  const[registered,setregistered]=useState(false);
  const { token } = useParams();
  const [errMsg, setErrMsg] = useState("");
  const validateInputs = (inputs) => {
    
    var emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    var fullNameRegex= /^([a-z]{2,}\s{0,1}){1,}$/i;
    var companyRegex=/^([a-z]{2,}\s{0,1}){1,}$/i;
    var userNameRegex=/^[a-z0-9_]{2,}$/i;
    var phoneRegex= /^[0-9]{10}$/i;
    var passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
    let result=true;
    let errStr="";
    for (let input of inputs) {
      console.log(input);
      switch (input.inputType) {
        case "username":
          
          result=userNameRegex.test(input.inputValue);
          if(!result)errStr+="- username is invalid\n";
          break;
        case "fullname":
          result=fullNameRegex.test(input.inputValue);
         if (!result)errStr+="- full name is invalid\n";
          break;

        case "phonenumber":
   
          result=phoneRegex.test(input.inputValue);
         if(!result)errStr+="- phone number is invalid\n";
          break;

        case "companyname":
          result=companyRegex.test(input.inputValue);
        if  (!result)errStr+="- company name is invalid\n";
          break;

        case "email":
          result=emailRegex.test(input.inputValue);
        if (!result)errStr+="- email is invalid\n";
          break;
          case "password":
            result=passwordRegex.test(input.inputValue);
          if (!result)errStr+="- password is invalid\n";
            break;
      }
    }
    if(errStr!="")
    {
      const errStr2=errStr.split('\n').map((item,key)=><span key={key}>{item}<br/><br/></span>)
      props.regMsg(errStr2);
      props.msgColor("#F8D7DA");
      return false;
    }
    return true;
  };

  if (props.userType == "user") {
    const saveRegularuser = (e) => {
      e.preventDefault();
      const userName = e.target.elements.userName.value.trim();
      const fullName = e.target.elements.fullName.value.trim();
      const phoneNumber = e.target.elements.phoneNumber.value.trim();
      const password = e.target.elements.password.value.trim();
      const inputs = [
        { inputValue: userName, inputType: "username" },
        { inputValue: fullName, inputType: "fullname" },
        { inputValue: phoneNumber, inputType: "phonenumber" },
        { inputValue: password, inputType: "password" },
      ];
      if(!validateInputs(inputs))
      {
        
        return 0;
      }
      let emailExists = false;
      axios
        .post("http://localhost:8005/users/signupRegularUser", {
          userName,
          fullName,
          phoneNumber,
          password,
          token,
        })
        .then(function (response) {
          emailExists = response.data.emailExists;
          console.log(emailExists);
          if (!emailExists) {
            props.regMsg("Registration successful");
            props.msgColor("#D4EDDA");
            setregistered(true);
          } else {
            props.regMsg("the username already exists!");
            props.msgColor("#F8D7DA");
          }
        })

        .catch(function (error) {
          console.log(error);
        });
    };

    let inputs = [];
    inputs = [
      { inputType: "text", inputName: "userName", inputString: "User name" },
      { inputType: "text", inputName: "fullName", inputString: "Full name" },
      {
        inputType: "text",
        inputName: "phoneNumber",
        inputString: "Phone number",
      },

      { inputType: "password", inputName: "password", inputString: "Password" },
      {
        inputType: "password",
        inputName: "confirmPassword",
        inputString: "Confirm password",
      },
    ];
    const inputsList = inputs.map((value, index) => (
      <Input
        key={index}
        inputType={value.inputType}
        inputName={value.inputName}
        inputString={value.inputString}
      />
    ));
    return (
      <div> 
        {!registered? <div>
        <form className="register" onSubmit={saveRegularuser}>
          {inputsList}
          <Button buttonText="Register" />
        </form>
        <div>{errMsg}</div>

      </div>:<Link to="/">go to sign in page</Link>}
     
      </div>
    );
  }

  const authToDatabase = (e) => {
    e.preventDefault();

    const userName = e.target.elements.userName.value.trim();
    const password = e.target.elements.password.value.trim();

    axios
      .post("http://localhost:8005/users/signin", { userName, password })
      .then(function (response) {
        const { loginCorrect, token } = response.data;
        if (loginCorrect) {
          props.regMsg("Login successful");
          props.msgColor("#D4EDDA");
          localStorage.setItem("token", token);
          window.location.reload();
        } else {
          props.regMsg("Username or password is incorrect!");
          props.msgColor("#F8D7DA");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  const saveDetailsOnDatabase =async (e) => {
    e.preventDefault();
    const userName = e.target.elements.userName.value.trim();
    const fullName = e.target.elements.fullName.value.trim();
    const companyName = e.target.elements.companyName.value.trim();
    const phoneNumber = e.target.elements.phoneNumber.value.trim();
    
    const email = e.target.elements.email.value.trim();
    const password = e.target.elements.password.value.trim();
    const inputs = [
      { inputValue: userName, inputType: "username" },
      { inputValue: fullName, inputType: "fullname" },
      {inputValue:companyName,inputType:"companyname"},
      {inputValue:email,inputType:"email"},
      { inputValue: phoneNumber, inputType: "phonenumber" },
      { password: password, inputType: "password" },
    ];
     if(!validateInputs(inputs))
    {
      return 0;
    }
    let emailExists = false;
    axios
      .post("http://localhost:8005/users/signup", {
        userName,
        fullName,
        companyName,
        phoneNumber,
        email,
        password,
      })
      .then(function (response) {
        emailExists = response.data.emailExists;
        console.log(emailExists);
        if (!emailExists) {
          props.regMsg("Registration successful");
          props.msgColor("#D4EDDA");
        } else {
          props.regMsg("the username already exists!");
          props.msgColor("#F8D7DA");
        }
      })

      .catch(function (error) {
        console.log(error);
      });
  };

  let inputs = [];

  if (props.formAction == "register") {
    inputs = [
      { inputType: "text", inputName: "userName", inputString: "User name" },
      { inputType: "text", inputName: "fullName", inputString: "Full name" },
      {
        inputType: "text",
        inputName: "companyName",
        inputString: "Company name",
      },
      {
        inputType: "text",
        inputName: "phoneNumber",
        inputString: "Phone number",
      },
      { inputType: "email", inputName: "email", inputString: "Email" },
      { inputType: "password", inputName: "password", inputString: "Password" },
      {
        inputType: "password",
        inputName: "confirmPassword",
        inputString: "Confirm password",
      },
    ];
  }
  if (props.formAction == "login") {
    inputs = [
      { inputType: "text", inputName: "userName", inputString: "User name" },
      { inputType: "password", inputName: "password", inputString: "Password" },
    ];
  }

  const inputsList = inputs.map((value, index) => (
    <Input
      key={index}
      inputType={value.inputType}
      inputName={value.inputName}
      inputString={value.inputString}
    />
  ));

  return (
    <form
      className={props.formAction == "login" ? "login" : "register"}
      onSubmit={
        props.formAction == "login" ? authToDatabase : saveDetailsOnDatabase
      }
    >
      {inputsList}
      {
        <Button
          buttonText={props.formAction == "login" ? "Login" : "Register"}
        />
      }
      {props.formAction == "login" ? (
        <a href="/forgotpassword">Forgot your password?</a>
      ) : (
        ""
      )}
      <div>{errMsg}</div>
    </form>
  );
}

export default AuthForm;
