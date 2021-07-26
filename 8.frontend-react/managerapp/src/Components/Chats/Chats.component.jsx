import React, { useState } from "react";
import "./css/chats-style.css";
function Chats(props) {
  const [numOfChats, setNumOfChats] = useState(0);
  const [chatToDisplay,setChatToDisplay]=useState(0);
const chatTitle=[ <div onClick={()=>{setChatToDisplay(0)}} tabindex="1">Chat 1</div>]
  const chatsArr = [
  <div className='chatDiv'><iframe width='100%' height='100%' src="http://localhost:9000/crm-side" /></div>
  ];
  return (
    <div className="chatsContainer">
           
     <div className="chatsListContainer">
       {chatTitle}
        </div>
        {chatsArr[chatToDisplay]}
    </div>

  );
}

export default Chats;
