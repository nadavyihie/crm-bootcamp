import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import "./css/chat-style.css";
var socket = io.connect("http://localhost:9000");
function Chat(props) {
  const [showChat, setShowChat] = useState(false);
  const [roomsTitle, setRoomsTitle] = useState([]);
  const [currentRoom, setCurrentRoom] = useState([]);
  const [roomsMsg, setRoomsMsg] = useState({});
  const [userName, setUserName] = useState("");
  useEffect(() => {
    socket.emit("crmListening");


    socket.on("sendRoomToParticipants", (client_room, userName) => {
      
      socket.emit("joinCrmToRoom", client_room);
            axios
        .get(`http://localhost:9090/rooms/getbyname?name=${client_room}`)
        .then((res) => {
          var roomMsg = roomsMsg;
          if (res.data == null) {
          axios
        .get(`http://localhost:9090/rooms/getbyname?name=${client_room}`)
        .then((res) => {
          var roomMsg = roomsMsg;
          if (res.data == null) {
            axios
              .post(`http://localhost:9090/rooms`, {
                name: client_room,
                messages: [],
              })
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
              roomMsg[client_room] = { messages: [] };
              setRoomsMsg(roomMsg);

          } else {
            roomMsg[client_room] = { messages: res.data['messages']};
            console.log(roomMsg[client_room])
            setRoomsMsg(roomMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });


      setRoomsTitle((roomsTitle) => [
        ...roomsTitle,
        <div
          tabindex="1"
          onClick={() => {
            setCurrentRoom(client_room);
            setShowChat(true);
            setUserName(userName);

            var messages = document.getElementById("messages");
            if (messages != null) {
              messages.innerHTML = "";
            }

            if (roomsMsg[client_room].messages.length != 0) {
              for (var element in roomsMsg[client_room].messages) {
                var item = document.createElement("li");
                item.textContent =
                  roomsMsg[client_room].messages[element].message;
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
          {userName}
        </div>,
      ]);

      var roomMsg = roomsMsg;
      roomMsg[client_room] = { messages: [] };
      setRoomsMsg(roomMsg);
    });
    socket.on("isTyping",(room)=>{
      var tempCurrentRoom = "";
      setCurrentRoom((current) => {
        tempCurrentRoom = current;
      });
      setCurrentRoom(tempCurrentRoom);
      if(tempCurrentRoom==room){
      let typing=document.querySelector('.typing')
      typing.innerHTML="is typing..."
      setTimeout(() => {
        typing.innerHTML=""
      }, 1500);
    }
    })
    socket.on("message", function (msg, room) {
      var tempCurrentRoom = "";
      setCurrentRoom((current) => {
        tempCurrentRoom = current;
      });
      setCurrentRoom(tempCurrentRoom);
      var roomMsg = roomsMsg;
      var dateNow=new Date();
      roomMsg[room].messages.push({ message: msg, type: "client" ,time:`${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()} ${dateNow.getHours}:${dateNow.getMinutes}`});
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
      const dateNow=new Date();
      roomMsg[currentRoom]["messages"].push({
        message: e.target.input.value,
        type: "crm",time:`${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()} ${dateNow.getHours}:${dateNow.getMinutes}`
      });
      setRoomsMsg(roomMsg);

      var messages = document.getElementById("messages");
      var item = document.createElement("li");
      var tempDiv = document.createElement("div");
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
          <div id="titleMsg">
            <div className="username">{userName}</div>
            <div className='typing'></div>
          </div>

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