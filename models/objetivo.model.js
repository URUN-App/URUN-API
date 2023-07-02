const Mongoose = require("mongoose");
const Schema = Mongoose.Schema;

const objectiveSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true

    },
    Actividad: {
        type: String
    },
    Periodo: {
        type: String
    },
    Alcance:  {
        Distancia:{
            type: Number
        },
        Calorias:{
            type:Number
        },
        Veces: {
            type:Number
        }
    }
})

module.exports = Mongoose.model("Objective", objectiveSchema);