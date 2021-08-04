const express = require('express');
const md5 = require("md5");
const app = express();
const mysql = require('mysql');
const router = express.Router();
const jwt = require('jsonwebtoken');
var Mailgun = require('mailgun-js');
const UserServices=require("../../services/userServices");
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
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
router.post('/resetpassword', async function(req,res){

  try{
    const result=await UserServices.resetPassword(req.body.password,req.body.email)
    res.status(200).json();
  }
  catch(err){
    console.log(err);
    res.status(500).json();
  }
  });
  
router.get('/validateLink',function(req,res){
  con.query(`SELECT * FROM accounts WHERE resetPassToken='${req.headers.token}'`, function (err, result, fields) {
    if (err) throw err;
    if(result!=0){
      console.log("blaaaaa")
       res.status(200).json({"email":result[0].email});
    }
    else{
      res.status(401).json({"message" : "not authenticated!!!"});
    }
  });
  });
  
  router.get('/registered',async function(req,res){

    userDetails=  await UserServices.readAccountByEmail(req.email);
    if(userDetails!=null)
     res.status(200).json(userDetails);
    else
    res.status(401).json();
  })
  
  router.get('/readaccount',async function(req,res){

    userDetails=  await UserServices.read(req.headers.id);
    if(userDetails!=null)
    {

     res.status(200).json(userDetails);
    }
     else
    res.status(401).json();
  })

  router.get('/', function(req, res) {
    res.send('hello ');
  });

  router.get('/fetchallusers',async function(req,res){

    allUsers=await UserServices.readAll(req.headers.managerid);
   
    if(allUsers!=0){
      res.status(200).json(allUsers)
    
    }
      else
    return res.status(401).json();
  });

  router.get('/test', async (req,res)=>{

    allUsers=await UserServices.readAll(req.headers.name)
 
    })

  router.post('/signup',(req,res)=>{
    let email="";
    let password="";
    let fullName="";
    let companyName="";
    let managerID="";
   
      if(req.body.token!=undefined){
     
        try{
          const verified = jwt.verify(req.body.token, process.env.MAIL_URL_KEY); 
        

          
          managerID=verified.managerid;
          companyName=verified.companyName;
          
          email=verified.email;
       
          fullName=req.body.inputs.fullName;
          password=req.body.inputs.password;

        }
        catch(err){
          
          res.status(401).json();
        }

      }
      else{

      email=req.body.email;
      password=req.body.password;
      fullName=req.body.fullName;
      companyName=req.body.companyName;
      managerID=req.body.managerID;
      }

      
      const encPassword=(md5(password));
      let emailExists=false;
      con.query(`SELECT * FROM accounts WHERE email='${email}'`, function (err, result, fields) {
      if (err) throw err;
      if(result!=0){
    
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
  )
});

  router.post('/signupRegularUser',(req,res)=>{
    const {userName,fullName,phoneNumber,password,token}=req.body;

    const verified=jwtVerify(req.body.token, process.env.MAIL_URL_KEY);
    const email=verified.email;
    const managerName=verified.managerName;
    const companyName=verified.companyName;

  
    const encPassword=(md5(password));
    let userNameExists=false;
    con.query(`SELECT * FROM accounts WHERE userName='${managerName}'`, function (err, result, fields) {
    if (err) throw err;
      const managerID=result[0].id;
   

      var sql = `INSERT INTO accounts (userName,fullName,companyName,phoneNumber,email,userPassword,managerID) VALUES ('${userName}','${fullName}','${companyName}','${phoneNumber}','${email}','${encPassword}','${managerID}')`;
      con.query(sql, function (err, result) {
        if (err) throw err;

  
      });
    
    
    
    const data={userNameExists}; 
     res.send(data);
  }
)});
  
  router.post('/signin',(req,res)=>{
  

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

    }
    else{
 
      res.status(400).json();
    }
    

  }
  )});


  router.post('/inviteuser',(req,res)=>{

    let linkToken = jwt.sign({managerid:req.body.managerid,companyName:req.body.companyName,email:req.body.email}, process.env.MAIL_URL_KEY);
    var mailgun = new Mailgun({apiKey: process.env.MAIL_API_KEY, domain: "mail.workiz.dev"});
    var msgdata = {
    //Specify email data
      from: 'gamestation@gmail.com',
    //The email to contact
      to: req.body.email,
    //Subject and text data  
      subject: 'Hello from Game station',
      html: `Hello, ${req.body.managerName} sent you invention to join his bussiness<a href="http://localhost:3000/signup/${linkToken}">Click here to join</a>`
    }
    //Invokes the method to send emails given the above data with the helper library
    mailgun.messages().send(msgdata, function (err, body) {
        //If there is an error, render the error page
        if (err) {
          console.log(err); 
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

    
    if(result!=0){
      const email=result[0].email;
      emailExists=true;
      let linkToken = jwt.sign({email:email}, process.env.MAIL_URL_KEY);
      var sql=`UPDATE accounts SET resetPassToken='${linkToken}' where email='${email}'`;
      con.query(sql, function (err, result, fields) {
        if (err) throw err;
        if(result==0){
          res.status(400).json();
        }
      });
  
      
      
          //We pass the api_key and domain to the wrapper, or it won't be able to identify + send emails
          var mailgun = new Mailgun({apiKey: process.env.MAIL_API_KEY, domain: process.env.MAIL_DOMAIN});
          var msgdata = {
          //Specify email data
            from: 'gamestation@gmail.com',
          //The email to contact
            to: `${email}`,
          //Subject and text data  
            subject: 'Hello from Game station',
            html: '<a href="http://localhost:3000/resetpassword/'+linkToken+'">Click here to reset your password</a>'
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