
const mysql = require("mysql");
const md5 = require("md5");
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "game_station",
});

con.connect(function (err) {
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
const create = ({ email, password, fullName, companyName, managerID }) => {
  const encPassword = md5(password);
  let idResult = -1;
  var sql = `INSERT INTO accounts (email,password,fullName,companyName,managerID) VALUES ('${email}','${encPassword}','${fullName}','${companyName}','${managerID}')`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("1 record inserted");
    if (result != 0) {
      idResult = result.insertId;
    }
  });
  return idResult;
};
/**
 * @param  {} id
 * @param  {} newField={fieldName,fieldValue}
 * returns true \ false
 */
const update = (id, { newFieldName, newFieldValue }) => {
  let isUpdate = false;
  var sql = `UPDATE accounts SET ${newFieldName}='${newFieldValue}' where id=${id}`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if (result != 0) {
      console.log("filed updated!");
      isUpdate = true;
    }
  });
  return isUpdate;
};

const resetPassword = async (newPassword, email) => {


  const newEncPassword=(md5(newPassword));


  var sql = `UPDATE accounts SET resetPassToken=NULL,userPassword='${newEncPassword}' where email='${email}'`;
  try {
    const result = await SubmitQuery(sql, con);
    return result;
  } catch (err) {
    throw err;
  }
};

/**
 * @param  {} id
 * return true \ false
 */
const remove = (id) => {
  let isRemove = false;
  con.query(
    `DELETE FROM accounts where id=${id}`,
    function (err, result, fields) {
      if (err) throw err;
      if (result != 0) {
        console.log("user removed!");
        isRemove = true;
      }
    }
  );
  return isRemove;
};

/**
 * @param  {} id
 * return User
 */

// user models\User.js as model
const read = async (id) => {
  let userDetails = null;
  try {
    var sql = `select * from accounts WHERE id='${id}'`;
    details = await SubmitQuery(sql, con);
    if (details != 0) {
      // userDetails= User(details[0].id,details[0].email,details[0].password,details[0].fullName,details[0].companyName,details[0].managerID);
      userDetails = details;
    }
    // return userDetails;
  } catch (err) {
    return null;
  }

  return userDetails;
};
const readAccountByEmail = async (email) => {
  let userDetails = null;
  try {
    var sql = `select * from accounts WHERE email='${email}'`;
    details = await SubmitQuery(sql, con);
    if (details != 0) {
      // userDetails= User(details[0].id,details[0].email,details[0].password,details[0].fullName,details[0].companyName,details[0].managerID);
      userDetails = details;
      console.log(userDetails)
    }
    // return userDetails;
  } catch (err) {
    return null;
    console.error(err.message);
  }

  return userDetails;
};
const readByName = async (email) => {
  try {
    let userDetails = null;
    var sql = `select * from accounts WHERE email='${email}'`;
    details = await SubmitQuery(sql, con);
    if (details != 0) {
      userDetails = User(
        details[0].userName,
        details[0].fullName,
        details[0].companyName,
        details[0].phoneNumber,
        details[0].email,
        details[0].managerID
      );
    }
    return userDetails;
  } catch (err) {
    console.error(err.message);
  }
};
const nameToId = async (userName) => {
  try {
    let userDetails = null;
    var sql = `select * from accounts WHERE userName='${userName}'`;
    details = await SubmitQuery(sql, con);
    if (details != 0) {
      userId = details[0].id;
    }
    return userId;
  } catch (err) {
    console.error(err.message);
  }
};
/**
 * return Array<User>
 */

// user models\User.js as model
const readAll = async (managerid) => {
  try {
    var sql = `select * from accounts where managerID='${managerid}'`;
    details = await SubmitQuery(sql, con);
    if (details != 0) return details;
  } catch (err) {
    return null;
  }
};

function SubmitQuery(query_str, connection) {
  return new Promise(function (resolve, reject) {
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

module.exports = {
  readAccountByEmail,
  create,
  update,
  remove,
  read,
  readAll,
  readByName,
  resetPassword
};
