import React, { useState } from "react";
import "./css/chats-style.css";
function Chats(props) {
  const [numOfChats, setNumOfChats] = useState(1);
  const [chatArr, setChatArr] = useState([
    <div  className="chatDiv" key={0}>
      <iframe width="100%" height="100%" src="http://localhost:9000/crm-side" />
    </div>
  ]);
  const [chatToDisplay, setChatToDisplay] = useState(0);
  const [chatTitle,setChatTitle]=useState([    <div
    onClick={()=>{changeChatToDisplay(0)}}
    tabIndex="1"
  >
    Chat 1
  </div>]);
const addChat=()=>{

  setChatArr(chatArr => [...chatArr, <div key={numOfChats} className="chatDiv">
  <iframe width="100%" height="100%" src="http://localhost:9000/crm-side/" />
</div>]);
  setChatTitle(chatTitle=>[...chatTitle,   <div
    onClick={()=>{changeChatToDisplay(numOfChats)}}
    tabIndex={numOfChats+1}
  >
    Chat {numOfChats+1}
  </div>])
  setNumOfChats(numOfChats+1);
console.log(chatArr)
}
const changeChatToDisplay=(num=>{

  chatArr.
  setChatToDisplay(num)
})
  return (
    <div className="chatsContainer">
     
      {chatArr}
     

      <button onClick={addChat}></button>
    </div>)
}

export default Chats;
