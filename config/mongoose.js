const Mongoose = require("mongoose");
const debug = require("debug")("app:mongoose");

const dbhost = process.env.DBHOST || "localhost";
const dbport = process.env.DBPORT || "27017";
const dbname = process.env.DBNAME || "URUN-DB";

const dbUri = 'mongodb+srv://Sofia:E7WUFUG0fHbPmmjL@urundb.epzzada.mongodb.net/' || `mongodb://${dbhost}:${dbport}/${dbname}`;

const connect = async () =>{
    debug(dbUri);
    try {
        await Mongoose.connect(dbUri); 
        debug(" Successful database connection ");
    } catch (error) {
        debug("Error while connecting to datbase");
        process.exit(1);
    }
      
}

module.exports = {
    connect
}