
 
import React, { useState } from "react";

import './css/generatelink-style.css'
function GenerateLink(props) {
    const [showLink,setShowLink]=useState(false);
    const [generatedLink,setGeneratedLink]=useState("");
    const generateLink=()=>{
        setShowLink(true);
        let link=`http://localhost:3000/${props.userDetails[0].companyName.replace(/ /g, "")}/${props.userDetails[0].managerID==-1?props.userDetails[0].id:props.userDetails[0].managerID}`;
        setGeneratedLink(link);

    }

  return (
    <div className="generateContainer">
        <div className="titles">Here you can generate a link where your customers can view their rentals and more. </div>
        <div className="titles">Click the button below to generate a link:</div>
        <button className="generateButton" onClick={generateLink}>Generate link</button>
        {showLink?<div className="linkContainer">
            
       <input className="linkLable" value={generatedLink} />
        <button className="copyButton" onClick={() => {navigator.clipboard.writeText(generatedLink)}}>Copy link</button>
        </div>:null}
    </div>
  );
}

export default GenerateLink;
