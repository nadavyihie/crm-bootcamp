const express = require('express');
const app = express();
const mysql = require('mysql');
const router = express.Router();
const md5=require('md5');
const jwt = require('jsonwebtoken');
var Mailgun = require('mailgun-js');
const e = require('express');
// const User = require('../../models/User');
const UserServices=require("../../services/userServices");
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

const jwtVerify=(token,tokenSec)=>{
  try{
    const verified = jwt.verify(token, tokenSec); 
    return verified;
  }
  catch(err){
    return 401;
  }
}
router.post('/resetpassword',function(req,res){
  console.log(req.body.password)
  const newEncPassword=(md5(req.body.password));
  var sql=`UPDATE accounts SET resetPassToken=NULL,userPassword='${newEncPassword}' where userName='${req.body.userName}'`;
  con.query(sql, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      
      res.status(200).json({"message":"Your password has been successfully reset"});
    }
    else{
      res.status(401).json({"message" : "Can not reset password right now, try again later."});
    }
  });
  });
  
router.get('/validateLink',function(req,res){
  console.log(req.headers.token);
  con.query(`SELECT * FROM accounts WHERE resetPassToken='${req.headers.token}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      
      return res.status(200).json({"message": "I'm Alive!"
      ,"userName":result[0].userName});
    }
    else{
      res.status(401).json({"message" : "not authenticated!!!"});
    }
  });
  });
  
  router.get('/registered',async function(req,res){
  
    userDetails=  await UserServices.readByName(req.userName);
    console.log(userDetails)
    return res.status(200).json({"message": "I'm Alive!"
                                ,"userDetails":userDetails});
  })
  

  router.get('/', function(req, res) {
    res.send('hello ');
  });

  router.get('/fetchallusers',async function(req,res){
    
    allUsers=await UserServices.readAll(req.headers.name);
    console.log(allUsers);
    return res.status(200).json({"message": "I'm Alive!"
                                ,"allUsers":allUsers})

  });

  router.get('/test', async (req,res)=>{
    // console.log(req.headers.name)
    allUsers=await UserServices.readAll(req.headers.name)
    console.log(allUsers);
      // if(userDetails==null){
      //     res.status(401);
      // }
   
      // res.status(200);
    
    })

  router.post('/signup',(req,res)=>{
  
      const {email,password,fullName,companyName,managerID}=req.body;
      console.log(companyName);
      const encPassword=(md5(password));
      let emailExists=false;
      con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
        console.log(result[0]);
        res.status(400).json();
        }
      else{
        
        var sql = `INSERT INTO accounts (email,userPassword,fullName,companyName,managerID) VALUES ('${email}','${encPassword}', '${fullName}','${companyName}','${managerID}')`;
        con.query(sql, function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
          res.status(200).json();
        });
      
      
      }
      
    }
  )});

  router.post('/signupRegularUser',(req,res)=>{
    const {userName,fullName,phoneNumber,password,token}=req.body;
    // console.log(token);
    const verified=jwtVerify(req.body.token, process.env.MAIL_URL_KEY);
    const email=verified.email;
    const managerName=verified.managerName;
    const companyName=verified.companyName;
    // console.log(verified);
  
    const encPassword=(md5(password));
    let userNameExists=false;
    con.query(`SELECT * FROM accounts WHERE userName='${managerName}'`, function (err, result, fields) {
    if (err) throw err;
      const managerID=result[0].id;
      console.log(managerID);

      var sql = `INSERT INTO accounts (userName,fullName,companyName,phoneNumber,email,userPassword,managerID) VALUES ('${userName}','${fullName}','${companyName}','${phoneNumber}','${email}','${encPassword}','${managerID}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
  
      });
    
    
    
    const data={userNameExists}; 
     res.send(data);
  }
)});
  
  router.post('/signin',(req,res)=>{
  
    // console.log(req.body)
    const {email,password}=req.body;
    const encPassword=(md5(password));
    
    let token=null;
    let loginCorrect=false;
    con.query(`SELECT * FROM accounts WHERE email='${email}' AND userPassword='${encPassword}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      const email=result[0].email
     
      const accessToken = jwt.sign({email:email}, process.env.JWT_KEY);
      token=accessToken;
      res.status(200).json(token);
      // console.log(token);
    }
    else{
      console.log("login faild");
      res.status(400).send();
    }
    

  }
  )});


  router.post('/inviteuser',(req,res)=>{

    let linkToken = jwt.sign({managerName:req.body.managerName,companyName:req.body.companyName,email:req.body.email}, process.env.MAIL_URL_KEY);
    var mailgun = new Mailgun({apiKey: process.env.MAIL_API_KEY, domain: "mail.workiz.dev"});
    var msgdata = {
    //Specify email data
      from: 'gamestation@gmail.com',
    //The email to contact
      to: req.body.email,
    //Subject and text data  
      subject: 'Hello from Game station',
      html: `Hello, ${req.body.managerName} sent you invention to join his system<a href="http://localhost:3000/${linkToken}">Click here to register</a>`
    }
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(msgdata, function (err, body) {
        //If there is an error, render the error page
        if (err) {
          ; 
          res.status(401).json({"message":"We could not send the email at this time, please try again later"});
            
        }
        //Else we can greet    and leave
        else {
            //Here "submitted.jade" is the view file for this landing page 
            //We pass the variable "email" from the url parameter in an object rendered by Jade
           
            res.status(200).json({"message":"We sent the email!"});
        }

  });
  });
  router.post('/forgotpassword',(req,res)=>{
  
    const email=req.body.email;
   
    let emailExists=false;
    con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
    if (err) throw err;
    console.log(result);
    if(result!=0){
      const userName=result[0].userName;
      emailExists=true;
      let linkToken = jwt.sign({userName:userName}, process.env.MAIL_URL_KEY);
      var sql=`UPDATE accounts SET resetPassToken='${linkToken}' where email='${email}'`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result==0){
          res.status(401).json({"message" : "not authenticated!!!"});
        }
      });
      console.log(linkToken);
      console.log(email);
      
      
          //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
          var mailgun = new Mailgun({apiKey: process.env.MAIL_API_KEY, domain: "mail.workiz.dev"});
          var msgdata = {
          //Specify email data
            from: 'gamestation@gmail.com',
          //The email to contact
            to: 'nadav.yihie@workiz.com',
          //Subject and text data  
            subject: 'Hello from Game station',
            html: 'Hello, This is not a plain-text email, I wanted to test some spicy Mailgun sauce in NodeJS! <a href="http://localhost:3000/resetpassword/'+linkToken+'">Click here to add your email address to a mailing list</a>'
          }
          //Invokes the method to send emails given the above data with the helper library
          mailgun.messages().send(msgdata, function (err, body) {
              //If there is an error, render the error page
              if (err) {
                ; 
                res.status(401).json({"message":"We could not send you an email at this time, please try again later"});
                  
              }
              //Else we can greet    and leave
              else {
                  //Here "submitted.jade" is the view file for this landing page 
                  //We pass the variable "email" from the url parameter in an object rendered by Jade
                  const data={emailExists}; 
                  res.status(200).json({"message":"We sent you an email!"});
              }
          });
      
    }
    else{

      res.status(401).json({"message":"The email address is not exists"});
    }
  
    // const data={emailExists}; 
    //  res.send(data);
  }
  )});

module.exports = router;