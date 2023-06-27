const express = require("express");
const router = express.Router();

//route import
const authRouter = require("./auth.router");

//Defining routes
router.use("/auth", authRouter);


module.exports = router;