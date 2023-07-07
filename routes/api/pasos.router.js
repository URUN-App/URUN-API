const express = require('express');
const router = express.Router();

const pasosController = require("../../controller/pasos.controller");
const {authentication,authorization} = require("../../middlewares/auth.middleware");
const runValidators = require("../../middlewares/index.middleware");
const ROLES = require("../../data/roles.constants.json");


router.post('/counter', authentication,authorization(ROLES.USER),runValidators,pasosController.setPasos);

router.get('/getSteps', authentication,pasosController.getObjective);

module.exports = router;