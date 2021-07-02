import React, { useReducer, useState } from "react";
import Button from "../Button/Button.component";
import "./css/loginForm-style.css"
import validateInput from "./scripts/validateInput";
function Form(props) {
  const [errArr,setErrArr]=useState({email:"",password:"",companyName:"",fullName:""});
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [companyName,setCompanyName]=useState("");
  const [fullName,setFullName]=useState("");
 
  const handleChange = (event) => {
    const { name, value } = event.target;
    const errMsg=validateInput(name,value);
    switch(name){
      case 'email':
        setEmail(errMsg);
        break;
        case 'companyName':
          setCompanyName(errMsg);
          break;
          case 'fullName':
            setFullName(errMsg);
            break;
            case 'password':
              setPassword(errMsg);
              break;
    }
  };

  const handleSubmit=()=>{}

const errCheck=(inputName)=>{
  switch(inputName){
    case 'email':
      return email;
      case 'password':
        return password;
        case 'companyName':
          return companyName;
          case 'fullName':
            return fullName;
  }
}

  const inputsList = props.inputs.map((value, index) => (
    <div className="inputs">
      <input
        key={index}
        inputType={value.inputType}
        name={value.inputName}
        placeholder={value.inputString}
        autocomplete="off"
        onChange={handleChange}
      />
      <span>{value.inputName}</span>
    </div>
  ));
  
  return (
    <form className={props.formStyle} onSubmit={handleSubmit}>
      
      {props.inputs.map((value, index) => (
    <div className="inputs">
      <input
        key={index}
        inputType={value.inputType}
        name={value.inputName}
        placeholder={value.inputString}
        autocomplete="off"
        onChange={handleChange}
      />
      <span className="errMsg">{errCheck(value.inputName)}</span>
    </div>
  ))}
      <button>{props.buttonText}</button>
    </form>
  );
}

export default Form;
