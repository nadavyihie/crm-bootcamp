const validateInput = (inputType, inputValue) => {
  var emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var fullNameRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var companyRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  let result = true;
  let errStr = "";

  switch (inputType) {
    case "fullName":
      result = fullNameRegex.test(inputValue);
      if (!result) return "Full name is not valid(must be at least 2 letters)";
      return "";

    case "companyName":
      result = companyRegex.test(inputValue);
      if (!result) return "Company name is not valid(must be at least 2 letters)";
      return "";

    case "email":
      result = emailRegex.test(inputValue);
      if (!result) return "Email is not valid";
      return "";

    case "password":
      result = passwordRegex.test(inputValue);
      if (!result) return "At least 8 characters with capital letters and digits";
      return "";
  }
};

export default validateInput;