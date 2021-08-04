var redis = require("redis");
var subscriber = redis.createClient();

const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });




subscriber.on("message", async  (channel,eventsJson)=> {
   
    const eventsArr=JSON.parse(eventsJson)
    const  bulkBody=[];
    for(let e of eventsArr){
        
        bulkBody.push({ "index":{"_index":"events","_type":e.type} });
        bulkBody.push({"accountID":e.accountID, "event":e.event })
    }



        try{
      await client.bulk({body: bulkBody});
      console.log("Events saved successfully")
      }
      catch(err){
          console.log(err);
          throw err
      }

    

   });
   subscriber.subscribe("addEventsArr");






