const { body, param } = require("express-validator");

const validators = {};
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,32})/

validators.registerValidator = [
    body("username")
    .notEmpty().withMessage("This is a required field, please write a username.")
    .isLength({min: 4 , max: 32}).withMessage("The username should be between 4 and 32 characters long"),
    body("email")
    .notEmpty().withMessage("This is a required field, please write a email.")
    .isEmail().withMessage("Pleas write a valid email"),
    body("password")
    .notEmpty().withMessage("This is a required field, please write a password.")
    .matches(passwordRegexp).withMessage("The password must have between 8 and 32 chars, and at least 1 M, 1 m and 1 #.")
]

module.exports = validators;