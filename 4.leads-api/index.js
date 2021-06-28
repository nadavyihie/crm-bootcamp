const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gameStation"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");

});


app.get('/admin', function(req, res) {
  con.query("SELECT * FROM leads", function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    res.send(result);
   
  }
)});

app.get('/', function(req, res) {
  res.send('hello there');
});

app.post('/',function(req,res){
  console.dir(req);

  const {fullName,email,phoneNumber}=req.body;
  // console.log({fullName,phoneNumber,email});
  const ifValid=validateInput(fullName,email,phoneNumber);
  
  if(ifValid){

   
      var sql = `INSERT INTO leads (email, fullName,phoneNumber) VALUES ('${email}', '${fullName}','${phoneNumber}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
  
      });

    res.send(true);
  }
  else{
    res.send(false);
  }
});
app.listen('8004', () => {
  console.log(`Server running at http://localhost:$8004/`);
});

validateInput=function(fullName,email,phoneNumber){
  
  var fullNameRegex= /^([a-z]{2,}\s{0,1}){1,}$/i;
  var emailRegex= /^[a-z0-9]{1,}@[a-z0-9]{1,}.[a-z0-9]{1,}$/i
  var phoneRegex= /^[0-9]{10}$/i;
  var result=fullNameRegex.test(fullName);
  if(result==false)
  {
      return false;
  
  }
  result=emailRegex.test(email);
  if(result==false)
  {
     return false;
  }
  result=phoneRegex.test(phoneNumber);
  if(result==false)
  {
     return false;
  }
  return true;

}