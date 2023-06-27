const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");

const crypto = require("crypto");

const userSchema = new Schema({
    nameUser: {
        type: String,
        require: true,
        trim: true   
    },
    emailUser: {
        type: String,
        require: true,
        trim: true
    },
    passwordUser: {
        type: String,
        require: true
    },
    pictureUser: {
        type:String
    },
    salt:{
        type: String
    },

    tokens:{
        type : [ String],
        default: []

    }

});

userSchema.methods = {
   encryptPassword: function(password){
    if(!password) return "";

    try{
        const encryptPassword = crypto.pbkdf2Sync(
            password,
            this.salt,
            1000,64,
            `sha512`
        ).toString("hex");

        return encryptPassword;
    }catch (error){
        debug({error});
        return "";
    }
   },
   makeSalt: function(){
    return crypto.randomBytes(16).toString("hex");
   },
   comparePassword: function (password) {
    return this.passwordUser === this.encryptPassword(password);
   }
}

userSchema.virtual("password")
.set(function(password = crypto.randomBytes(16).toString()){
    if(!password) return;

    this.salt = this.makeSalt();
    this.passwordUser = this.encryptPassword(password);
})

module.exports = Mongoose.model("User", userSchema);