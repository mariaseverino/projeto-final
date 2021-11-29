const knex = require("knex");
const knexfile = require("../../knexfile");

console.log("qual a connecção");
let connection = null;

connection =
    process.env.NODE_ENV === "test"
        ? knex(knexfile.test)
        : knex(knexfile.development);

console.log(connection);

module.exports = connection;
