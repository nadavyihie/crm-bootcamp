import axios from "axios";
const serverURL = "http://localhost:9500/events/";
let pageWindow = [];
let accountID="";
let eventsArr = [];
const bindPluginEvents = async (pageWin,accID) => {

  pageWindow = pageWin;
  accountID=accID;
  try {
    addEvents();
    setInterval(() => {
      if(eventsArr.length>0)
        saveEvent();
      eventsArr = [];
    }, 10000);
  } catch (err) {
    console.log(err);
  }
};

const addEvents = () => {
  //load window time
  pageWindow.addEventListener("click", (event) => {
    let url=(event.target.baseURI).split('3000/');
    let page=url[1];

    eventsArr.push({
      "type": "click",
      "accountID":accountID,
      "event": {
        "time": new Date(),
        "className": event.target.className,
        "textConten": event.target.innerText,
        "page": page?page:'home'
      },
    });
  });

  
};
const saveEvent = () => {
  
  axios
    .post(serverURL + "addEvent", eventsArr)
    .then((res) => {
      console.log("Events array successfully saved");
    })
    .catch((err) => {
      console.log("Cannot save the events array right now");
    });
};

export { bindPluginEvents };
