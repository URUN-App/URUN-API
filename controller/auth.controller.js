const User = require("../models/user.model");
const debug = require("debug")("app:auth-contoller");
const jwt = require("jsonwebtoken");
const { createToken, verifyToken } = require("../helpers/jwtUtil");
const { response } = require("express");
const bcrypt = require("bcryptjs");
const ROLES = require("../data/roles.constants.json");

const controller = {};

//Registering user
controller.register = async (req, res) => {
    // Getting the values 
  const { username, email, password } = req.body;

  // Creating a new user
  const newuser = new User({ username, email, password, roles: [ROLES.USER]});

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
  try{
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

    //login in
    //generating JWT
    const token =  createToken(user._id);
    user.tokens = [token, ...user.tokens.filter(_token => verifyToken(_token)).splice(0,4)];
    await user.save();
    return res.status(200).json({ token: token });


    //response
  }catch(error) {
    //log in unsuccessfull
    return res.status(500).json({
      error: "Log in unsuccessfull"
    })
  }
}



  controller.whoami = async (req, res) => {
    const {token} = req.body;

    try{
      const tokenDecoded = await jwt.decode(token);

      return res.json({
        message: "You are logged in",
        user: tokenDecoded,
      });
    }catch(error){
      console.log(error);
      return res.json({
        message: "You are not logged in"
      });
    }
    
  }

module.exports = controller;