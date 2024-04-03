/** Database connection for CRUD. */

const { Client } = require("pg");
const { DATABASE_URI } = require("./config");

const db = new Client({
    connectionString: DATABASE_URI 
});

db.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Error connecting to the database", err));

module.exports = db;
