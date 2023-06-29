const User = require("../models/user.model");
const debug = require("debug")("app:auth-contoller");
const { createToken, verifyToken } = require("../helpers/jwtUtil");
const { response } = require("express");
const bcrypt = require("bcryptjs");

const controller = {};

//Registering user
controller.register = async (req, res) => {
    // Getting the values 
  const { username, email, password } = req.body;

  // Creating a new user
  const newuser = new User({ username, email, password});

  // Check if the user exists/ email exists
  const user = await User.findOne({ $or: [{ username: username }, { email: email }] });

  if (user) {
    return res.status(400).json({
      msg: "Username/ Email already exists",
    });
  }

  // Encrypting password
  const salt = bcrypt.genSaltSync();
  newuser.password = bcrypt.hashSync(password, salt);

  // saving user 
  await newuser.save();

  res.status(201).json({
    msg: "User created successfully",
  });
}

//login
controller.login = async(req, res = response) => {
    const {email, password}= req.body;

    const user = await User.findOne( {email});

    if (!user) {
        return res.status(400).json({
          error: "Email  does not match",
        });
      }
    //checking password
    const isMatch = bcrypt.compareSync(password, user.password);

    if(!isMatch){
        return res.status(400).json({
            error: "passoword/ user does not match"
        })
    }

    //mock up login
    return res.status(200).json({message: "Log in succesfull"});
}



  controller.whoami = async (req, res) => {
    try {
        const {_id,nameUser,emailUser} = req.user;
        return res.status(200).json({_id, nameUser, emailUser});
    }catch (error){
        debug(error);
        return res.status(500).json({error: "Unexpected error"})
    }
  }

module.exports = controller;