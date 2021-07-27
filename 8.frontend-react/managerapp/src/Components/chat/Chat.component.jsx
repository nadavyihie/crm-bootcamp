import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./css/chat-style.css";
var socket = io.connect("http://localhost:9000");
function Chat(props) {
  const [showChat, setShowChat] = useState(false);
  const [roomsTitle, setRoomsTitle] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState({});

  useEffect(() => {
    socket.emit("crmListening");

    socket.on("sendRoomToParticipants", (client_room) => {
      socket.emit("joinCrmToRoom", client_room);
      setRoomsTitle((roomsTitle) => [
        ...roomsTitle,
        <div
          tabindex="1"
          onClick={() => {
            setCurrentRoom(client_room);
            setShowChat(true);
            var messages = document.getElementById("messages");
            if(messages!=null){
                messages.innerHTML=""
            }
            
            if (roomsMsg[client_room].messages.length != 0) {
            
              for (var element in roomsMsg[client_room].messages) {

                var item = document.createElement("li");
                item.textContent = roomsMsg[client_room].messages[element].message;
                item.className =
                roomsMsg[client_room].messages[element].type == "client"
                    ? "clientMsg"
                    : "myMsg";
                messages.appendChild(item);
                window.scrollTo(0, document.body.scrollHeight);
              }
            }
          
       
          }}
        >
          {client_room}
        </div>,
      ]);

      var roomMsg = roomsMsg;
      roomMsg[client_room] = { messages: [] };
      setRoomsMsg(roomMsg);
    });

    socket.on("message", function (msg, room) {
      var tempCurrentRoom = "";
      setCurrentRoom((current) => {
        tempCurrentRoom = current;
      });

      var roomMsg = roomsMsg;
      roomMsg[room].messages.push({ message: msg, type: "client" });
      setRoomsMsg(roomMsg);

      if (room == tempCurrentRoom) {
        var messages = document.getElementById("messages");
        var item = document.createElement("li");
        item.textContent = msg;
        item.className = "clientMsg";
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);
      }
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (e.target.input.value) {
    
      var roomMsg = roomsMsg;
      console.log(currentRoom)
      roomMsg[currentRoom]['messages'].push({
        message: e.target.input.value,
        type: "crm",
      });
      setRoomsMsg(roomMsg);

      var messages = document.getElementById("messages");
      var item = document.createElement("li");
      item.textContent = e.target.input.value;
      item.className = "myMsg";
      messages.appendChild(item);
      window.scrollTo(0, document.body.scrollHeight);

      socket.emit("message", {
        room: currentRoom,
        message: e.target.input.value,
      });
      e.target.input.value = "";
    }
  };

  return (
    <div className="chatsContainer">
      <div className="rentalsMenu">{roomsTitle}</div>
      {showChat ? (
        <div className="chatBox">
          <div id="titleMsg"></div>
          <ul id="messages"></ul>
          <form id="form" onSubmit={sendMessage}>
            <input id="input" autocomplete="off" />
            <button>Send</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
