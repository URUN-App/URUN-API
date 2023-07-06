const express = require('express');
const router = express.Router();
const { check } = require("express-validator");

const {authentication} = require("../../middlewares/auth.middleware");

/* const JWT = require('../../middlewares/jwt.middleware'); */
const userController = require('../../controller/user.controller');
//todo: "add userExistByID to the db validator"


router.get("/myInfo",authentication,userController.getInfo);

/* router.get("/users",JWT.validateJWT,userController.getUsers);

router.get("/:id", JWT.validateJWT, userController.usersGetOne);

router.put("/:id", [JWT.validateJWT, check("id", "is not a valid ID").isMongoId(),
                                    check("id").custom(userExistByID) ],
                                    userController.usersPut);

//follow a user
router.post(
    "/follows/:id", [JWT.validateJWT, check("id", "is not a valid ID").isMongoId(),
                                    userController.usersFollow]
); */



module.exports = router;