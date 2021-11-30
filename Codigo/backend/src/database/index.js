const knex = require("knex");
const knexfile = require("../../knexfile");

let connection = null;

if (process.env.NODE_ENV === "test") {
    connection = knex(knexfile.test);
} else {
    connection = knex(knexfile.development);
}

module.exports = connection;
