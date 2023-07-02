const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const pasosSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    Pasos: {
        type: Number
    },
    
})

module.exports = Mongoose.model("Pasos", pasosSchema);