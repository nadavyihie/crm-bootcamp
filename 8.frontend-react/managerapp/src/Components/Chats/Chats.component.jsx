import axios from "axios";
import React, { useEffect, useState } from "react";
import Chat from "../chat/Chat.component";
import "./css/chats-style.css";
function Chats(props) {
  const [roomsTitle, setRoomsTitle] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState({});
  const [currentRoom,setCurrentRoom]=useState("");
  const [showChat,setShowChat]=useState(false);
  const [userName,setUserName]=useState("");
useEffect(()=>{
 



    axios("http://localhost:9090/rooms/getall").then((res)=>{
let tempRoomsTitle=[]
let tempRoomsMsg={}
    for(let tempRoom of res.data)
    {
      tempRoomsTitle.push({userName:tempRoom.userName,room:tempRoom.name}); 
      tempRoomsMsg[tempRoom.name]={messages:tempRoom.messages}
       }

    console.log(res.data)
    setRoomsTitle(tempRoomsTitle)  
    setRoomsMsg(tempRoomsMsg)
  })
    .catch(err=>{
      console.log(err);
    })


},[])


return (
  <div className="chatsHistoryContainer">
    <div className="chatsList">
      {roomsTitle.map((roomTitle) => (
        <div
          tabindex="1"
          onClick={() => {
            setCurrentRoom(roomTitle.room);
            setShowChat(true);
            setUserName(roomTitle.userName);
          }}
        >
          {roomTitle.userName}
        </div>
      ))}
    </div>
    {showChat ? (
      <div className="chatBox">
        <div id="titleMsg">
          <div className="username">{userName}</div>
   
        </div>

        <div id="messages">
          {roomsMsg[currentRoom]?.messages.map((msg) => (
            <div
              
              className={msg.type == "client" ? "clientMsg" : "myMsg"}
            >
              {msg.message}
              <div className="dateMsg"> {msg.time}</div>
            </div>
          ))}

  
        </div>
     
      </div>
    ) : null}
  </div>
);
}

export default Chats;
