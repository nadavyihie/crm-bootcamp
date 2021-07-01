const User=require('../models/User');
const mysql = require('mysql');
const md5 =require('md5');
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
const create=({userName,fullName,companyName,phoneNumber,password,email,managerID})=>{
  const encPassword=(md5(password));
let idResult=-1;
  var sql = `INSERT INTO accounts (userName,fullName,phoneNumber,email,userPassword,managerID) VALUES ('${userName}','${fullName}','${companyName}','${phoneNumber}','${email}','${encPassword}','${managerID}')`;
  
 con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    if(result!=0){
    
      idResult= result.insertId
    }
    
  })
  return idResult;
  
}
/**
 * @param  {} id
 * @param  {} newField={fieldName,fieldValue}
 * returns true \ false
 */
const update=(id,{newFieldName,newFieldValue})=>{
  let isUpdate=false;
    var sql=`UPDATE accounts SET ${newFieldName}='${newFieldValue}' where id=${id}`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        console.log("filed updated!")
        isUpdate= true;
      }
     
    });
    return isUpdate;
}

/**
 * @param  {} id
 * return true \ false
 */
const remove = (id) =>{
  let isRemove=false;
    con.query(`DELETE FROM accounts where id=${id}`, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        console.log("user removed!")
        isRemove= true;
      }
      

    });
    return isRemove;
}

/**
 * @param  {} id
 * return User
 */

// user models\User.js as model
const read=(id)=>{
  let userDetails=null;
  console.log(id);
    var sql=`select * from accounts WHERE id=${id}`;
    con.query(sql, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        
      // const userDetails= User(result[0].userName,result[0].fullName,result[0].companyName,result[0].phoneNumber,result[0].email,result[0].managerID);
     
    userDetails=result[0];      }
    
    });
    return userDetails;
}
const readByName= async(userName)=>{
  try{
    let userDetails=null;
    var sql=`select * from accounts WHERE userName='${userName}'`;
    details = await SubmitQuery(sql,con);
    if(details!=0){
      userDetails= User(details[0].userName,details[0].fullName,details[0].companyName,details[0].phoneNumber,details[0].email,details[0].managerID);
    
    }
      return userDetails;
  }
  catch(err){
    console.error(err.message);
  }
}
/**
 * return Array<User>
 */

// user models\User.js as model
const readAll =async () =>{
  try{
    let allUsersArr
    let userDetails=null;
    var sql=`select * from accounts`;
    details = await SubmitQuery(sql,con);
    if(details!=0){
      // userDetails= User(details[0].userName,details[0].fullName,details[0].companyName,details[0].phoneNumber,details[0].email,details[0].managerID);
      allUsersArr = details.map((singleUser) => (
       { userName:singleUser.userName,
          fullName:singleUser.fullName,
          phoneNumber:singleUser.phoneNumber,
          email:singleUser.email}
      ));
       
      // console.log(details);
    }
    console.log(allUsersArr);
      return allUsersArr;
  }
  catch(err){
    console.error(err.message);
  }
}


function SubmitQuery(query_str,connection)
{
    return new Promise(function(resolve, reject) {
        connection.query(query_str, function (err, rows, fields) {
            // Call reject on error states,
            // call resolve with results
            if (err) {
                return reject(err);
            }
            resolve(rows);
        });
    });
}



module.exports = {create,update,remove,read,readAll,readByName};