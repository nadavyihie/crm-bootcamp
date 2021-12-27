
 
import React, { useState } from "react";
import {FcCheckmark} from 'react-icons/fc'
import './css/generatelink-style.css'

function GenerateLink(props) {
    const [showLink,setShowLink]=useState(false);
    const [generatedLink,setGeneratedLink]=useState("");
    const [copiedLink,setCopiedLink]=useState(false);
    const generateLink=()=>{
        setShowLink(true);
        let link=`http://localhost:3000/clientportal/${props.userDetails[0].companyName.replace(/ /g, "")}/${props.userDetails[0].managerID==-1?props.userDetails[0].id:props.userDetails[0].managerID}`;
        setGeneratedLink(link);

    }

    const copyLink=(e)=>{
    
      setCopiedLink(true);
      navigator.clipboard.writeText(generatedLink);
    }

  return (
    
    <div className="generateContainer">
        <div className="titles">Here you can generate a link where your customers can view their rentals and more. </div>
        <div className="titles">Click the button below to generate a link:</div>
        <button className="generateButton" onClick={generateLink}>Generate link</button>
        {showLink?<div className="linkContainer">
            
       <input className="linkLable" value={generatedLink} />
        <button className={!copiedLink?"copyButton":"copiedButton"} onClick={copyLink}>{copiedLink?"Copied":"Copy"}</button>
        </div>:null}
        {copiedLink?<div className="copiedMassage"><FcCheckmark/>Copied link to clipboard</div>:null}
    </div>
  );
}

export default GenerateLink;
