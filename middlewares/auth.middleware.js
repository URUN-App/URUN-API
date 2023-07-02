const{verifyToken} = require('../helpers/jwtUtil');
const debug = require("debug")("app:auth-middleware");
const User = require("../models/user.model");
const ROLES = require("../data/roles.constants.json")
const middleware = {};
const tokenPrefix = "Bearer"

middleware.authentication = async(req, res, next) => {
    try{
         const{authorization} = req.header;

        if(!this.authentication){
            return res.status(401).json({error: "Not authorized"});
        }

        const [prefix, token] = authorization.split(" ");

        if(prefix !== tokenPrefix){
            return res.status(401).json({error:"Not authorized"});
        }

        if(!token){
            return res.status(401).json({error: "Not authorized"});
        }

        const tokenObject = verifyToken(token);
        if(!tokenObject){
            return res.status(401).json({error: "Not authorized"});
        } 

        const {userId} = tokenObject;
        debug(userId);

        //Geting the user
        const user = await User.findById(userId);

        if(!user){
            return res.status(401).json({ error: "Not authorized"});  
        }

        //Registered token
        const isTokenValid = user.token.includes(token);
        if(!isTokenValid){
            return res.status(401).json({ error: "Not authorized"});  
        }

        //Modifying req for getting the user information
        req.user = user;
        req.token = token;

        next();

    }catch (error){
        debug ({error})
        return res.status(500).json({ error: "Unexpected error"});
    }
}

middleware.authorization = (roleRequired = ROLES.SYSADMIN) => {
    return (req, res, next) => {
      try {
        //Paso 0: Asumir que se ejecuta después del proceso de autenticacion
        const { roles = [] } = req.user;
  
        //Paso 1: Verificar si el rol existe en el arreglo
        const roleIndex =
          roles.findIndex(role => (role === roleRequired || role === ROLES.SYSADMIN));
  
        //Paso 2: Realizar el filtro de rol
        if (roleIndex < 0) {
          return res.status(403).json({ error: "No tienes permiso" });
        }
  
        //Paso 3: Pasar al siguiente middleware
        next();
      } catch (error) {
        debug({ error });
        return res.status(500).json({ error: "Error inesperado de servidor" });
      }
    }
  }
  



module.exports = middleware;