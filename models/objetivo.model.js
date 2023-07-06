const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const objectiveSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    Altura: {
        type: Number
    },
    Peso: {
        type: Number
    },
    Actividad: {
        type: String
    },
    Periodo: {
        type: String
    },
    Distancia:{
        type: Number
    },
    Calorias:{
        type:Number
    },
     Veces: {
        type:Number
    }   
})

module.exports = Mongoose.model("Objective", objectiveSchema);