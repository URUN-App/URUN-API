const User = require("../models/user.model");
const Objetivo = require("../models/objetivo.model");
const debug = require("debug")("app:objetivo-controller");

const controller = {};

controller.setObjective = async (req, res) => {
    try{
        const {Altura, Peso, Actividad, Periodo, Distancia, Calorias,Veces} = req.body;
        const { _id: userId } = req.user;

        const objetivo = new Objetivo({
            Altura: Altura,
            Peso: Peso,
            Actividad: Actividad,
            Periodo: Periodo,
            Distancia: Distancia,
            Calorias: Calorias,
            Veces: Veces,
            user: userId
        });

        const newObjective = await objetivo.save();

        if(!newObjective){
            return res.status(409).json({ error: "There was a problem creating the goal" }); 
        }
        return res.status(201).json(newObjective);
    }catch(error){
        debug({error});
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.getObjective = async (req,res) =>{
    try {
        const { _id: userId } = req.user;
    
        const objetivo =
          await Objetivo
            .find({ user: userId })
        return res.status(200).json({ objetivo })
      } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Internal server error" });
      }
}

controller.findAll = async (req, res) => {
    try {
      const objetivo =
        await Objetivo
          .find({})
          
  
      return res.status(200).json({ objetivo });
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error interno de servidor" });
    }
  }




module.exports = controller;