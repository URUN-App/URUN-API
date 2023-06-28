const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;
const debug = require("debug")("app:user-model");


//const crypto = require("crypto"); crypto has been deprecated

const bcrypt = require("bcrypt");

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


userSchema.pre('save', function(next){
    var user = this;   
    bcrypt.genSalt(10, function(err, Salt){
        if(err) return next(err);

        bcrypt.hash(user.password, Salt, function(err, hash){
            if(err) return next(err);

            user.password = hash;
            next();
        })
    })
})

 userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
}; 



module.exports = Mongoose.model("User", userSchema);