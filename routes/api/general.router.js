const express = require("express");
const router = express.Router();

//route import
const authRouter = require("./auth.router");
const objectiveRouter = require("./objective.router");
const userRouter = require("./user.router")
const stepsRouter = require("./pasos.router");

//Defining routes
router.use("/auth", authRouter);
router.use("/objective", objectiveRouter);
router.use("/user",userRouter);
router.use("/steps", stepsRouter);



module.exports = router;