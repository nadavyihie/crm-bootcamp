const { Client } = require("@elastic/elasticsearch");
const client = new Client({ node: "http://localhost:9200" });
const addEvent = async (eventsArr) => {
const bulkBody=[]
//   const body = eventsArr.map(doc => [{ index: {} }, doc.event]);
// const body=[{ "index":{"_index":"events","_type":"click"} },
// { "name":"john doe","age":25 },
// { "index":{"_index":"events","_type":"click"} },
// { "name":"mary smith","age":32 }]
for(let e of eventsArr){
    bulkBody.push({ "index":{"_index":"events","_type":e.type} });
    bulkBody.push({ "event":e.event })
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
