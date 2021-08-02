const express = require('express');
const app = express();
const router = express.Router();
const eventServices=require('../../services/eventsServices')
  router.post('/addEvent', async (req,res)=>{
   const eventsArr=req.body;
   try{
     await eventServices.addEvent(eventsArr)
    res.status(200).json({message:"Document created successfully"})
   }
   catch(err){
     res.status(500).json();

   }
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