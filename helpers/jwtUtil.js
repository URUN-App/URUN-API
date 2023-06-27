const jwt = require("jsonwebtoken");
const secret = process.env.JWTSECRET || "secret";
const expTime = process.env.TOKEN_EXP || "30d";
const helper = {};

// Generating a JWT token
helper.createToken = (_id) => {
  return jwt.sign({userId: _id}, secret, {expiresIn: expTime});
}

helper.verifyToken = (token) =>{
  try{
    return jwt.verify(token, secret);
  }catch{
    return false;
  }
}

module.exports = helper;