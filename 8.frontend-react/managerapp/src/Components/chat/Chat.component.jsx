import axios from "axios";
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
const [isTyping,setIsTyping]=useState(false);
const [msgList,setMsgList]=useState([]);
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
            roomMsg[client_room] = { messages: res.data["messages"] };
            console.log(roomMsg[client_room]);
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
          }}
        >
          {userName}
        </div>,
      ]);

      var roomMsg = roomsMsg;
      roomMsg[client_room] = { messages: [] };
      setRoomsMsg(roomMsg);
    });
    socket.on("isTyping", (room) => {
      var tempCurrentRoom = "";
      setCurrentRoom((current) => {
        tempCurrentRoom = current;
      });
      setCurrentRoom(tempCurrentRoom);
      if (tempCurrentRoom == room) {
        setIsTyping(true);
        setTimeout(() => {
       setIsTyping(false);
        }, 1500);
      }
    });
    socket.on("message", function (msg, room) {
      var tempCurrentRoom = "";
      setCurrentRoom((current) => {
        tempCurrentRoom = current;
      });
      setCurrentRoom(tempCurrentRoom);
      var roomMsg = roomsMsg;
      var dateNow = new Date();
      roomMsg[room].messages.push({
        message: msg,
        type: "client",
        time: `${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()} ${
          dateNow.getHours
        }:${dateNow.getMinutes}`,
      });
      setRoomsMsg(roomMsg);
    });
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    if (e.target.input.value) {
    
      socket.emit("message", {
        room: currentRoom,
        message: e.target.input.value,
      });
      let roomMsg = roomsMsg;
      const dateNow = new Date();
      roomMsg[currentRoom]["messages"].push({
        message: e.target.input.value,
        type: "crm",
        time: `${dateNow.getDate()}.${dateNow.getMonth()}.${dateNow.getFullYear()} ${
          dateNow.getHours
        }:${dateNow.getMinutes}`,
      });
      setRoomsMsg([]);
      setTimeout(() => {
        setRoomsMsg(roomMsg);
      }, 10);
      e.target.input.value = "";
    }
  };

  const sendTyping=()=>{
    socket.emit('typing',currentRoom);  }

  return (
    <div className="chatsContainer">
      <div className="rentalsMenu">{roomsTitle}</div>
      {showChat ? (
        <div className="chatBox">
          <div id="titleMsg">
            <div className="username">{userName}</div>
            <div className="typing">{isTyping?'is typing...':null}</div>
          </div>

          <div id="messages">
            {roomsMsg[currentRoom]?.messages.map((msg) => (
              <div className={msg.type == "client" ? "clientMsg" : "myMsg"}>
                {msg.message}
              </div>
            ))}
          </div>
          <form id="form" onSubmit={sendMessage}>
            <input id="input" autocomplete="off" onKeyUp={sendTyping}/>
            <button >Send</button>
          </form>
        </div>

      ) : null}
      
    </div>
  );
}

export default Chat;
