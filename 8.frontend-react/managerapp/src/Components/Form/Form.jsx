import React from "react";
import Input from "../Input";
function Form(props) {
  const inputsList = props.inputs.map((value, index) => (
    <Input
      key={index}
      inputType={value.inputType}
      inputName={value.inputName}
      inputString={value.inputString}
    />
  ));
  return <div></div>;
}

export default Form;
