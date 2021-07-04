import React, { useReducer, useState } from "react";
import Button from "../Button/Button.component";
import "./css/loginForm-style.css"
import validateInput from "./scripts/validateInput";
function Form(props) {
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

  const handleSubmit=(e)=>{
    e.preventDefault();
  //  console.dir(e.target.elements);
   for(const element of e.target.elements)
   {
     if(element.nodeName=='INPUT')
      if(element.value=="")
        return 0;
    
   }



    const validForm= email==""&&fullName==""&&companyName==""&&password=="";
    if(validForm){

      props.submitAction(e);
    }
  }

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
  
  return (
    <form className={props.formStyle} onSubmit={handleSubmit}>
      
      {props.inputs.map((value, index) => (
    <div className="inputs">
      <input
        key={index}
        type={value.inputType}
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
