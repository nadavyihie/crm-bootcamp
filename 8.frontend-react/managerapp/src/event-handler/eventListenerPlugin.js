import axios from "axios";


let accountID=""
let pageWindow=[];

let eventsArr = []
const initEventListener = async (accountID, pageWindow) => {
    pageWindow=pageWindow
    accountID=accountID
  try {
    await loadEvents();
    addEvents();

  } catch (err) {
    console.log(err);
  }
};

const addEvents = () => {
  pageWindow.addEventListener("click", (event) => {
    eventsArr.push({accountID:accountID,event:event});
  });

  pageWindow.addEventListener("copy", (event) => {
    eventsArr.push({accountID:accountID,event:event});  });

  window.addEventListener('beforeunload',(event)=>{
    saveEvents();
  })
};

const saveEvents = () => {
  axios
    .put(`http://localhost:9090/eventHandler/${accountID}`, {
      accountID: accountID,
    })
    .then((res) => {})
    .catch((err) => {
      throw err;
    });
};

const loadEvents = async () => {
  axios
    .get(
      `http://localhost:9090/eventHandler/getbyaccountid?accountID=${accountID}`
    )
    .then((res) => {
      if (res.data == null) {
        //  createEventsArr(accountID);
      } else {
        eventsArr = res.data.eventsArr;
      }
    })
    .catch((err) => {
      throw err;
    });
};

export { initEventListener, saveEvents, loadEvents };
