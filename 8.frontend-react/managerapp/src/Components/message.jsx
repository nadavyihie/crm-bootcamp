import React from 'react';
import './css/regMsg.css'
function Message(props) {
    
    return (
        <div className="registerMsg" style={{ backgroundColor: props.msgColor }}  >
            {props.msgContent }
        </div>
    );
}

export default Message;