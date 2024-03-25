/** Common config for CRUD */

// read .env files and make environmental variables

require("dotenv").config();
require("Colors");

const DB_URI = (process.env.NODE_ENV === "test")
  ? "crud_test"
  : "crud";

const SECRET_KEY = process.env.SECRET_KEY || "secret-crud";
const PORT =  +process.env.PORT || 3002;

BCRYPT_WORK_FACTOR = 12;


console.log("CRUD:".green);
console.log("PORT:".yellow, PORT.toString());
console.log("Database:".yellow, DB_URI);
console.log("---");

module.exports = {
  DB_URI,
  SECRET_KEY,
  PORT,
  BCRYPT_WORK_FACTOR,
};

