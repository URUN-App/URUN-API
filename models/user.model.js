const Mongoose = require("mongoose");
const { type } = require("express/lib/response");
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
    tokens: {
    type: [String],
    default: []
  },
    roles: {
    type: [String],
    default: []
  },
    status :{
        type: Boolean,
        default: true,
    },
    followers: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
    following: [{ type: Schema.Types.ObjectId, ref: "User", default: [] }],
},
{timestamps: true});

userSchema.methods.toJSON = function(){
    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;
};

module.exports = Mongoose.model("User", userSchema);