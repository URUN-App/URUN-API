const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");


//const crypto = require("crypto"); crypto has been deprecated


const userSchema = new Schema({
    username: {
        type: String,
        require: true,
        trim: true   
    },
    email: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true
    },
    pictureUser: {
        type:String
    },
    tokens:{
        type : [ String],
        default: []

    }
});

module.exports = Mongoose.model("User", userSchema);