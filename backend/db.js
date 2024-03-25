/** Database connection for CRUD. */

const { Client } = require("pg");
const { DB_URI } = require("./config");

const db = new Client({
    connectionString: DB_URI // Utilizando a URI de conexão do ElephantSQL
});

db.connect()
    .then(() => console.log("Connected to the database"))
    .catch(err => console.error("Error connecting to the database", err));

module.exports = db;
