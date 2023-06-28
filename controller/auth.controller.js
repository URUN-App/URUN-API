const User = require("../models/user.model");
const debug = require("debug")("app:auth-contoller");
const bcrypt = require("bcrypt");


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
            password: password
        });

        await newUser.save();

        return res.status(201).json({message: "User created successfully"})
    }catch (error){
        debug({error});
        return res.status(500).json({error: "Unexpected error"})
    }
}

//login
controller.login = async (req, res) => {
    try {
      const { identifier, password } = req.body;
  
      //Paso 01: Verificar si el usuario existe
      const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] });
  
      if (!user) {
        return res.status(404).json({ error: "El usuario no existe" });
      }
  
      //Paso 02: Comparar las contraseñas
      user.comparePassword(password, function(err, isMatch) {
        if (err) throw err;
        console.log(password, isMatch); 
    });
      

    } catch (error) {
      debug(error);
      return res.status(500).json({ error: "Error inesperado" })
    }
  }

module.exports = controller;