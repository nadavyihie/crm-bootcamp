const User=require('../models/User');
const mysql = require('mysql');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "game_station"
  });
  
  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
  
  });





/**
 * @param  {} {first_name
 * @param  {} last_name}
 * 
 * 
 * 
 * return id of the inserted row
 */
const create=({first_name,last_name})=>{
    
}


/**
 * @param  {} id
 * @param  {} newField={fieldName,fieldValue}
 * returns true \ false
 */
const update=(id,newField)=>{
    var sql=`UPDATE users SET ${newField.fieldName}=${newField.fieldValue},userPassword='${newEncPassword}' where userName='${id}'`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        
        return true;
      }
      return false;
    });
}

/**
 * @param  {} id
 * return true \ false
 */
const remove = (id) =>{
    con.query(`DELETE FROM users where id='${id}'`, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        return true;
      }
      return false;

    });
}

/**
 * @param  {} id
 * return User
 */

// user models\User.js as model
const read=(id)=>{
    var sql=`select * from users WHERE id='${id}'`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        
        return User(result[0].userName,result[0].fullName,result[0].phoneNumber,result[0].emil);
      }
      return null;
    });
}

/**
 * return Array<User>
 */

// user models\User.js as model
const readAll = () =>{

}

module.exports = {create,update,remove,read,readAll};