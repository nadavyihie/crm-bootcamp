const validateInput = (inputType, inputValue) => {
  var emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var fullNameRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var companyRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  var phoneNumberRegex=/^05\d([-]{0,1})\d{7}$/;
  var addressRegex=/(\d{1,}) [a-zA-Z\s]{1,}(,)[a-zA-Z\s]{1,}$/;
  let result = true;
  let errStr = "";
console.log()
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
      case "phoneNumber":
      result = phoneNumberRegex.test(inputValue);
      if (!result) return "Phone number is not valid";
      return "";
      case "address":
      result = addressRegex.test(inputValue);
      if (!result) return "Ex:12 Herzel, Rehovot";
      return "";
  }
};

export default validateInput;