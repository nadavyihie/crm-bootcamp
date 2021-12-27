const express = require('express');
const app = express();
var redis = require("redis");
var publisher = redis.createClient();
require('dotenv').config();
var bodyParser = require('body-parser')
const cors = require('cors');
app.use(cors());


app.use(bodyParser());




app.post('/sendSMS', (req, res)=> {
    console.log(req.body.phoneNumbersArr)
    const phoneNumbersArr=req.body.phoneNumbersArr;
    const message=req.body.message
    const smsArr={
        phoneNumbersArr:phoneNumbersArr,
        message:message
    }
    publisher.publish("sendSmsToClients", JSON.stringify(smsArr), function(){
        res.status(200).json({"Message":"Events array has been sent!"});
     })
})
 

app.listen(process.env.PORT, function() {
    console.log("Listening on port:",process.env.PORT);
 });