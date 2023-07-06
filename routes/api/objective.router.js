const express = require('express');
const router = express.Router();

const ROLES = require("../../data/roles.constants.json");
const runValidators = require("../../middlewares/index.middleware")
const {authentication, authorization} = require("../../middlewares/auth.middleware");
const objectiveController = require("../../controller/objetivos.controller");


router.post('/createObjective', authentication,authorization(ROLES.USER),runValidators,
                                objectiveController.setObjective);

router.get('/userObjective', objectiveController.getObjective)

module.exports = router;