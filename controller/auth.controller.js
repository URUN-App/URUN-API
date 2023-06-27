const User = require("../models/user.model");
const debug = require("debug")("app:auth-contoller");
const {createToken, verifyToken} = require("../helpers/jwtUtil");

const controller = {};

//Registering user
controller.register = async (req, res) => {
    try {
        //Getting the user information
         const {nameUser,emailUser,password} = req.body;

         //Verifying that the username or email doesnt exists already
          const user = await User.findOne({ $or: [{nameUser: nameUser}, {emailUser:emailUser}]});

        if(user){
            return res.status(409).json({error: "This user is already in use."});
        }  
 
        

        const newUser = new User({
            nameUser: nameUser,
            emailUser: emailUser,
            passwordUser: password
        });

        await newUser.save();

        return res.status(201).json({message: "User created successfully"})
    }catch (error){
        debug({error});
        return res.status(500).json({error: "Unexpected error"})
    }
}

module.exports = controller;