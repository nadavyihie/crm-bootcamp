const e = require('cors');
const cors = require('cors');
const express = require('express');
const mysqlserver=require
var Mailgun = require('mailgun-js');
const md5=require('md5');
const mysql = require('mysql');
const app = express();
const bodyParser = require('body-parser');
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());
const jwt = require('jsonwebtoken');
const JwtMiddleware=require('./checkJWTmiddleware');
const { response } = require('express');
const dotenv=require('dotenv');
dotenv.config();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gameStation"
});

app.use(function (req, res, next) {
  let tokenValidate=false;
    // console.log(req.originalUrl);
    if((req.originalUrl==="/signup" || req.originalUrl==="/signin") || req.originalUrl==="/forgotpassword")
    {
      next();
    }
    else{
    try {
      // const verified = jwt.verify(req.headers.token, toksec);
      // req.fullName=verified.fullName;
      // console.log(res.userEmail);
      next();
    }
    catch(err) {
     res.status(401).json({"message" : "not authenticated!!!"});
   
    }
  }
  
});

app.get('/registered',function(req,res){
  console.log(req.fullName);
  return res.status(200).json({"message": "I'm Alive!"
                              ,"fullName":req.fullName});
})

app.get('/', function(req, res) {
  res.send('hello ');
});

app.post('/signup',(req,res)=>{

    const {fullName,companyName,phoneNumber,email,password}=req.body;
    const encPassword=(md5(password));
    let emailExists=false;
    con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      emailExists=true;
    }
    else{
      
      var sql = `INSERT INTO accounts (fullName, companyName,phoneNumber,email,userPassword) VALUES ('${fullName}', '${companyName}','${phoneNumber}','${email}','${encPassword}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
  
      });
    
    
    }
    const data={emailExists}; 
     res.send(data);
  }
)});

app.post('/signin',(req,res)=>{

  // console.log(req.body)
  const {email,password}=req.body;
  const encPassword=(md5(password));
  
  let token=null;
  let loginCorrect=false;
  con.query(`SELECT * FROM accounts WHERE email='${email}' AND userPassword='${encPassword}'`, function (err, result, fields) {
  if (err) throw err;
  if(result!=0){
    const fullName=result[0].fullName;
    loginCorrect=true;

    const accessToken = jwt.sign({fullName:fullName ,email: email, }, toksec);
    token=accessToken;
    // console.log(token);
  }
  else{
    console.log("login faild");
  }

  const data={loginCorrect,token}; 
   res.send(data);
}
)});


app.listen("8005", () => {
  console.log(`Server running at http://localhost:8005/`);

});