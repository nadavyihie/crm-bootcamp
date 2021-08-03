const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });

const addEvent = async (eventsArr) => {
const bulkBody=[]

for(let e of eventsArr){
    bulkBody.push({ "index":{"_index":"events","_type":e.type} });
    bulkBody.push({"accountID":e.accountID, "event":e.event })
}
console.dir(bulkBody)
    try{
  await client.bulk({body: bulkBody});
  }
  catch(err){
      console.log(err);
      throw err
  }
};
module.exports = { addEvent };
