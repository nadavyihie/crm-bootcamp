import axios from "axios";

let pageWindow=[];

let eventsArr = []
const bindPluginEvents = async (pageWin) => {
    pageWindow=pageWin
  try {
    
    addEvents();

  } catch (err) {
    console.log(err);
  }
};

const addEvents = () => {
  pageWindow.addEventListener("click", (event) => {
    eventsArr.push({type:'click',event:{time:new Date(),className:event.target.className,textContent:event.target.innerText,URL:event.target.baseURI}});
    console.dir(eventsArr)
  });

  pageWindow.addEventListener('beforeunload',(event)=>{
    // saveEvents();
  })
};

// const saveEvents = () => {
//   axios
//     .put(`http://localhost:9090/eventHandler/${accountID}`, {
//       accountID: accountID,
//     })
//     .then((res) => {})
//     .catch((err) => {
//       throw err;
//     });
// };

// const loadEvents = async () => {
//   axios
//     .get(
//       `http://localhost:9090/eventHandler/getbyaccountid?accountID=${accountID}`
//     )
//     .then((res) => {
//       if (res.data == null) {
//         //  createEventsArr(accountID);
//       } else {
//         eventsArr = res.data.eventsArr;
//       }
//     })
//     .catch((err) => {
//       throw err;
//     });
// };

export { bindPluginEvents};
