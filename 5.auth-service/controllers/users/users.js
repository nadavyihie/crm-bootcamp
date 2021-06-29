const express = require('express');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const md5=require('md5');
const jwt = require('jsonwebtoken');
var Mailgun = require('mailgun-js');

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "gameStation"
});


router.get('/validateLink',function(req,res){

    try {
      const verified = jwt.verify(req.headers.token, process.env.MAIL_URL_KEY);
    
      return res.status(200).json({"message": "I'm Alive!"
      ,"fullName":verified.fullName});
     
    }
    catch(err) {
      res.status(401).json({"message" : "not authenticated!!!"});
    }
  });
  
  router.get('/registered',function(req,res){
    // console.log(req.fullName);
    return res.status(200).json({"message": "I'm Alive!"
                                ,"fullName":req.userName});
  })
  

  router.get('/', function(req, res) {
    res.send('hello ');
  });
  

  router.post('/signup',(req,res)=>{
  
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
  
  router.post('/signin',(req,res)=>{
  
    // console.log(req.body)
    const {userName,password}=req.body;
    const encPassword=(md5(password));
    
    let token=null;
    let loginCorrect=false;
    con.query(`SELECT * FROM accounts WHERE userName='${userName}' AND userPassword='${encPassword}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      const fullName=result[0].fullName;
      loginCorrect=true;
     
      const accessToken = jwt.sign({userName:userName ,email: email, }, process.env.JWT_KEY);
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
  
  router.post('/forgotpassword',(req,res)=>{
  
    const email=req.body.email;
    console.log(email);
    let emailExists=false;
    con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      const fullName=result[0].email;
      emailExists=true;
      let linkToken = jwt.sign({fullName:fullName}, process.env.MAIL_URL_KEY);
      var sql=`UPDATE accounts SET resetPassToken = '${linkToken}' WHERE email = '${email}'`;
      linkToken+=`/${fullName}`;
      console.log(linkToken);
          //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
          var mailgun = new Mailgun({apiKey: process.env.MAIL_API_KEY, domain: "mail.workiz.dev"});
          var msgdata = {
          //Specify email data
            from: 'gamestation@gmail.com',
          //The email to contact
            to: 'nadav.yihie@workiz.com',
          //Subject and text data  
            subject: 'Hello from Game station',
            html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://localhost:3000/users/resetpassword/'+linkToken+'">Click here to add your email address to a mailing list</a>'
          }
          //Invokes the method to send emails given the above data with the helper library
          mailgun.messages().send(msgdata, function (err, body) {
              //If there is an error, render the error page
              if (err) {
                const data={emailExists}; 
                  res.send(data);
                  console.log("got an error: ", err);
              }
              //Else we can greet    and leave
              else {
                  //Here "submitted.jade" is the view file for this landing page 
                  //We pass the variable "email" from the url parameter in an object rendered by Jade
                  const data={emailExists}; 
                  res.send(data);
              }
          });
      
    }
  
    // const data={emailExists}; 
    //  res.send(data);
  }
  )});

module.exports = router;