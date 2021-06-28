const mysql = require('mysql');

const createMysqlConnection=()=>{

    var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "",
        database: "gameStation"
      });

}



module.exports = { createMysqlConnection }
