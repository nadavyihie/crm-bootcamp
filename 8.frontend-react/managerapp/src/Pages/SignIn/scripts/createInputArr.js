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

export default createInput;
