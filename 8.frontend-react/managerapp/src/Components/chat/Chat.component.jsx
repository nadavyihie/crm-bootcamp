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
  const [roomsMsgHistory, setRoomsMsgHistory] = useState({});
  const [userName, setUserName] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [msgList, setMsgList] = useState([]);
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
                userName: userName,
                messages: [],
              })
              .then((res) => {})
              .catch((err) => {
                console.log(err);
              });
            roomMsg[client_room] = { messages: [] };
            setRoomsMsg(roomMsg);
          } else {
            roomsMsgHistory[client_room] = { messages: res.data["messages"] };

            setRoomsMsg(roomMsg);
          }
        })
        .catch((err) => {
          console.log(err);
        });

      let tempRoomsTitle = roomsTitle;
      let existRoom = false;
      for (let roomTitle of tempRoomsTitle) {
        if (roomTitle.room == client_room) existRoom = true;
      }
      if (!existRoom) {
        tempRoomsTitle.push({ userName: userName, room: client_room });

        setRoomsTitle([]);

        setTimeout(() => {
          setRoomsTitle(tempRoomsTitle);
        }, 10);
      }

      console.log(roomsTitle);
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
      let tempMsg = {
        message: msg,
        type: "client",
        time: `${dateNow.getDate()}.${dateNow.getMonth()+1}.${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
      };
      roomMsg[room].messages.push(tempMsg);
      setRoomsMsg(roomMsg);
      axios
        .put(`http://localhost:9090/rooms/${room}`, tempMsg)
        .then(() => {
          console.log("blaaaaaaaaaaaaaaa")
        })
        .catch((err) => {
          console.log(err);
        });
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
      const tempMsg = {
        message: e.target.input.value,
        type: "crm",
        time: `${dateNow.getDate()}.${dateNow.getMonth()+1}.${dateNow.getFullYear()} ${dateNow.getHours()}:${dateNow.getMinutes()}`,
      };
      roomMsg[currentRoom]["messages"].push(tempMsg);
      setRoomsMsg({});
      setTimeout(() => {
        setRoomsMsg(roomMsg);
      }, 10);
      e.target.input.value = "";
      axios
        .put(`http://localhost:9090/rooms/${currentRoom}`, tempMsg)
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const sendTyping = () => {
    socket.emit("typing", currentRoom);
  };

  return (
    <div className="chatsContainer">
      <div className="rentalsMenu">
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
            <div style={{width:'1vw',height:'2vh',backgroundColor:'green',borderRadius:'50%',marginLeft:'1vw',position:'absolute',marginTop:'1.5vh'}}></div>
            <div className="username">{userName}</div>
            <div className="typing">{isTyping ? "is typing..." : null}</div>
          </div>

          <div id="messages">
            {roomsMsgHistory[currentRoom]?.messages.map((msg) => (
              <div
                style={{ opacity: 0.6 }}
                className={msg.type == "client" ? "clientMsg" : "myMsg"}
              >
                {msg.message}
                <div className="dateMsg"> {msg.time}</div>
              </div>
            ))}

            {roomsMsg[currentRoom]?.messages.map((msg) => (
              <div className={msg.type == "client" ? "clientMsg" : "myMsg"}>
                {msg.message}
                <div className="dateMsg"> {msg.time.split(" ")[1]}</div>
              </div>
            ))}
          </div>
          <form id="form" onSubmit={sendMessage}>
            <input id="input" autocomplete="off" onKeyUp={sendTyping} />
            <button>Send</button>
          </form>
        </div>
      ) : null}
    </div>
  );
}

export default Chat;
