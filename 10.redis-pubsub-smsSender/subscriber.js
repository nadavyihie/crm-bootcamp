var redis = require("redis");
require('dotenv').config();
const twilio = require('twilio');
const client = new twilio(process.env.TwilioSID, process.env.TwilioToken);

var subscriber = redis.createClient();







subscriber.on("message", async  (channel,smsJson)=> {
   
    const smsArr=JSON.parse(smsJson);
    const phoneNumbersArr=smsArr.phoneNumbersArr.map(phoneNum=>"+972"+phoneNum)
    const message=smsArr.message;
   


    for(const phoneNum of phoneNumbersArr){
        setTimeout(() => {    
            client.messages.create({
              body: message,
              to: phoneNum, // Text this number
              from: process.env.TwilioNumber, // From a valid Twilio number
            })
            .then((message) => console.log(message.sid));
        }, 1500);
      

}

   });
   subscriber.subscribe("sendSmsToClients");






