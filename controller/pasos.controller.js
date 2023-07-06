const Steps = require("../models/pasos.model");
const debug = require("debug")("app:pasos-controller");

const controller = {};

controller.setPasos = async (req, res) => {
    try{
        const {Pasos} = req.body;
        const { _id: userId } = req.user;

        const steps = new Steps({
            Pasos:Pasos,
            user: userId
        });

        const newSteps  = await steps.save();

        if(!newSteps){
            return res.status(409).json({ error: "There was a problem adding your steps" }); 
        }
        return res.status(201).json(newSteps);
    }catch(error){
        debug({error});
        return res.status(500).json({ error: "Internal server error" });
    }
}

controller.getObjective = async (req,res) =>{
    try {
        const { _id: userId } = req.user;
    
        const steps =
          await Steps
            .find({ user: userId })
        return res.status(200).json({ steps })
      } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Internal server error" });
      }
}


module.exports = controller;