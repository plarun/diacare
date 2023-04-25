const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = validateRegisterInput = (data) => {
  let errors = {};

  console.log(data);

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.useras = !isEmpty(data.useras) ? data.useras : "";

  if (!validator.isEmail(data.email)) {
    errors.name = "Invalid email!";
  }
  if (validator.isEmpty(data.email)) {
    errors.name = "Email field is required!";
  }
  if (!validator.isLength(data.password)) {
    errors.name = "Characters must be between 6 and 15";
  }
  if (!validator.equals(data.password, data.password2)) {
    errors.name = "Passwords must match!";
  }
  if (validator.isEmpty(data.password2)) {
    errors.name = "Confirm password field is required!";
  }
  if (validator.isEmpty(data.password)) {
    errors.name = "Password field is required!";
  }
  if (validator.isEmpty(data.useras)) {
    errors.name = "User type is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
