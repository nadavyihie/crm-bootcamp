const express = require('express');
const app = express();
const router = express.Router();
var redis = require("redis");
var publisher = redis.createClient();
var subscriber = redis.createClient();





  router.post('/addEvent', async (req,res)=>{
    const eventsArr=req.body
    publisher.publish("addEventsArr", JSON.stringify(eventsArr), function(){
     res.status(200).json({"Message":"Events array has been sent!"});
  })
  })
  router.get('/',(req,res)=>{

    client.search({
      index: 'my-index',
      body: {
        query: {
          match: { hello: 'world' }
        }
      }
    }, (err, result) => {
      if (err) console.log(err)
    })

  });

module.exports = router;