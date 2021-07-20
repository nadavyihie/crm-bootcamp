const validateInput = (inputType, inputValue) => {
  var emailRegex =/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  var fullNameRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var companyRegex = /^([a-z]{2,}\s{0,1}){1,}$/i;
  var passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/;
  var phoneNumberRegex=/^05\d([-]{0,1})\d{7}$/;
  var addressRegex=/(\d{1,}) [a-zA-Z\s]{1,}(,)[a-zA-Z\s]{1,}$/;
  var priceRegex=/^[1-9]{1}[0-9]{0,}$/;
  var gameNameRegex=/^([a-z0-9]{2,}\s{0,1}){1,}$/i;
  var ratingRegex=/^[0-9](.[1-9])?$|^10$/;
  var genreRegex=/^([a-z]{2,}\s{0,1}){1,}$/i;
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
      case "phoneNumber":
      result = phoneNumberRegex.test(inputValue);
      if (!result) return "Phone number is not valid";
      return "";
      case "address":
      result = addressRegex.test(inputValue);
      if (!result) return "Ex:12 Herzel, Rehovot";
      return "";
      case "gameName":
        result = gameNameRegex.test(inputValue);
        if (!result) return "Invalid game name";
        return "";
        case "genre":
          result = genreRegex.test(inputValue);
          if (!result) return "Invalid genre";
          return "";
          case "rating":
            result = ratingRegex.test(inputValue);
            if (!result) return "Invalid rating";
            return "";
            case "price":
              result = priceRegex.test(inputValue);
              if (!result) return "Invalid price";
              return "";
            
  }
};

export default validateInput;