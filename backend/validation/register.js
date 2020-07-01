const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.surname = !isEmpty(data.surname) ? data.surname : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password_confirm = !isEmpty(data.password_confirm)
    ? data.password_confirm
    : "";

  if (!Validator.isLength(data.name, { min: 1 })) {
    errors.name = "İsminiz en az 1 karakter olmalıdır";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "İsim gereklidir";
  }

  if (Validator.isEmpty(data.surname)) {
    errors.surname = "Soyisim gereklidir";
  }

  if (!Validator.isLength(data.surname, { min: 1 })) {
    errors.surname = "İsminiz en az 1 karakter olmalıdır";
  }

  if (Validator.contains(data.surname, " ")) {
    errors.surname = "Soyad içerisinde boşluk bulunamaz";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "E-mail adresi geçersizdir";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "E-mail adresi gereklidir";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Şifre en az 6 karakter uzunluğunda olmalıdır";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Şifre gereklidir";
  }

  if (!Validator.isLength(data.password_confirm, { min: 6, max: 30 })) {
    errors.password_confirm = "Şifre en az 6 karakter uzunluğunda olmalıdır";
  }

  if (!Validator.equals(data.password, data.password_confirm)) {
    errors.password_confirm = "Şifreler uyuşmuyor";
  }

  if (Validator.isEmpty(data.password_confirm)) {
    errors.password_confirm = "Şifre gereklidir";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
