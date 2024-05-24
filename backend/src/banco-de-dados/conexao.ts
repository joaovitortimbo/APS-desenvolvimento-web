const pgp = require("pg-promise")(); 

const conexao: any = pgp("postgres://postgres:869231@localhost:5432/notes-jv");

module.exports = conexao;