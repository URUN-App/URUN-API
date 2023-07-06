const { body} = require("express-validator");

const validators = {};

validators.stepsValidator = [
    body("Pasos")
    .notEmpty().withMessage("There are no steps")
]

module.exports = validators;