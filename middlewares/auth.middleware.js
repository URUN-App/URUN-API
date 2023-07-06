const{verifyToken} = require('../helpers/jwtUtil');
const debug = require("debug")("app:auth-middleware");
const User = require("../models/user.model");
const ROLES = require("../data/roles.constants.json")
const middleware = {};
const tokenPrefix = "Bearer"

middleware.authentication = async (req, res, next) => {
  try {
    // Verify that authorization exists
    const { authorization } = req.headers;

    if (!authorization) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Verifying that it is a valid token
    // Token -> Bearer 
    const [prefix, token] = authorization.split(" ");

    if (prefix !== tokenPrefix) {
      return res.status(401).json({ error: "No autorizado" });
    }

    if (!token) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const tokenObject = verifyToken(token);

    if (!tokenObject) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const { userId } = tokenObject;
    debug(userId);

    // Getting the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Registered token
    const isTokenValid = user.tokens.includes(token);
    if (!isTokenValid) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Modifying the req to have the user info
    req.user = user;
    req.token = token;

    // Move to the next middleware
    next();
  } catch (error) {
    debug({ error })
    return res.status(500).json({ error: "Error inesperado de servidor" });
  }
}

middleware.authorization = (roleRequired = ROLES.SYSADMIN) => {
  return (req, res, next) => {
    try {
      
      const { roles = [] } = req.user;

      // Checking if the role exists in the array
      const roleIndex =
        roles.findIndex(role => (role === roleRequired || role === ROLES.SYSADMIN));

      // Perform role filter
      if (roleIndex < 0) {
        return res.status(403).json({ error: "No tienes permiso" });
      }

      //next middleware
      next();
    } catch (error) {
      debug({ error });
      return res.status(500).json({ error: "Error inesperado de servidor" });
    }
  }
}
  



module.exports = middleware;