const createInput = (inputType) => {
  let inputs = null;
  switch (inputType) {
    case "signup":
      inputs = [
        { inputType: "text", inputName: "email", inputString: "Email" },
        { inputType: "text", inputName: "fullName", inputString: "Full name" },
        {
          inputType: "text",
          inputName: "companyName",
          inputString: "Company name",
        },
        {
          inputType: "password",
          inputName: "password",
          inputString: "Password",
        },
      ];
      break;
    case "signin":
      inputs = [
        { inputType: "text", inputName: "email", inputString: "Email" },

        {
          inputType: "password",
          inputName: "password",
          inputString: "Password",
        },
      ];
      break;
  }

  return inputs;
};

const createArrFromInputs=(e,signAction)=>{
  let inputs=null;
  switch(signAction){
    case("signin"):
    inputs={email:e.target.elements.email.value.trim(),
      password:e.target.elements.password.value.trim()}
    break;
    case("signup"):
    inputs={email:e.target.elements.email.value.trim(),
             password:e.target.elements.password.value.trim(),
             fullName:e.target.elements.fullName.value.trim(),
             companyName:e.target.elements.companyName.value.trim(),
             managerID:-1

    }
  }
  return inputs;
}
export  {createInput,createArrFromInputs};
