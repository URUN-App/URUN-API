const express = require('express');
const router = express.Router();

const authController = require('../../controller/auth.controller');
const runValidator = require('../../middlewares/index.middleware')
const {registerValidator} = require('../../validators/auth.validator');
const { check } = require('express-validator');
const { authentication } = require("../../middlewares/auth.middleware");

router.post('/signup',registerValidator,
runValidator,
authController.register);

router.post('/signin', authController.login);

router.get('/whoami',authentication,authController.whoami);

module.exports = router;