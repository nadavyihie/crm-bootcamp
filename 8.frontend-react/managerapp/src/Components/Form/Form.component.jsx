import React, { useReducer, useState } from "react";

import "./css/loginForm-style.css"
import validateInput from "./scripts/validateInput";
function Form(props) {
  
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [companyName,setCompanyName]=useState("");
  const [fullName,setFullName]=useState("");
  const [phoneNumber,setPhoneNumber]=useState("");
  const [address,setAddress]=useState("");
  const [gameName,setgameName]=useState("");
  const [rating,setRating]=useState("");
  const [genre,setGenre]=useState("");
  const [price,setPrice]=useState("");
  const [imgURL,setimgURL]=useState("");
  // const handleFocus=(event)=>{
  //   if(props.defaultInputs){
  //     if(    event.target.value=="")
  //     {
  //       event.target.value=event.target.placeholder;
  //       handleChange(event);
  //     }
    
  //   }
  // }

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
              case 'address':
                setAddress(errMsg);
                break;
                case 'phoneNumber':
                  setPhoneNumber(errMsg);
                  break;
                  case 'gameName':
                    setgameName(errMsg);
                    break;
                    case 'genre':
                      setGenre(errMsg);
                      break;
                      case 'rating':
                        setRating(errMsg);
                        break;
                        case 'price':
                          setPrice(errMsg);
                          break;
                          case 'imgURL':
                          setimgURL(errMsg);
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



    const validForm= email==""&&fullName==""&&companyName==""&&password==""&&address==""&&phoneNumber==""&&gameName==""&&rating==""&&genre==""&&price=="";
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
            case 'phoneNumber':
              return phoneNumber;
              case 'address':
                return address;
                case 'gameName':
                  return gameName;
                  case 'genre':
                    return genre;
                    case 'rating':
                      return rating;
                      case 'price':
                        return price;
                        case 'imgURL':
                          return imgURL;
                
  }
}

    return(
<form className={props.formStyle} onSubmit={handleSubmit}>
      
      {props.inputs.map((element, index) => (
    <div className="inputs">
      <input
        key={index}
        type={element.inputType}
        name={element.inputName}
        defaultValue={props.inputValueStr?props.inputValueStr[element.inputName]:""}
        placeholder={element.inputString}
        autocomplete="off"
        onChange={handleChange}
        // onfocusout={handleFocus}
        // onFocus={handleFocus}
      />
      <span className="errMsg">{errCheck(element.inputName)}</span>
    </div>
  ))}
      <button>{props.buttonText}</button>
    </form>


    );
      }
export default Form;
