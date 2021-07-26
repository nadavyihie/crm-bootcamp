
import React, { useState } from 'react';
import './css/homePage-style.css';
import './css/dropDownMenu-style.css';
import { BiLogOut } from "react-icons/bi";
import {IoHome} from 'react-icons/io5';
import { MdAccountCircle } from "react-icons/md";
import {FaUserAlt} from "react-icons/fa";
import {IoGameController} from "react-icons/io5"
import {ImUsers} from "react-icons/im"
import {MdArrowDropDown,MdArrowDropUp} from 'react-icons/md'
import Dashboard from '../../Components/Dashboard/Dashboard';
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
  } from "react-router-dom";

function HomePage(props) {
  const [chosenOption,setChosenOption]=useState("home");
  const [showClientMenu,setShowClientMenu]=useState(false);
    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href='/';
      };
      const highlightOption=(option)=>{
        setChosenOption(option);
      }

    return (
        <div className="homepage">

        <div className="topNav">
          <span className="companyTitle">{props.userDetails[0].companyName}</span>
       <span className='username'>{props.userDetails[0].fullName}</span>
        
        {<Link className={chosenOption=='home'?"topNavItemChosen":"topNavItem"} to="/" onClick={()=>{highlightOption("home")}}><IoHome className='icon'/> Home</Link>}
        {<Link className={chosenOption=='users'?"topNavItemChosen":"topNavItem"} to="/users" onClick={()=>{highlightOption("users")}}><FaUserAlt className='icon'/>Users</Link>}
        
        {<Link className={chosenOption=='Games'?"topNavItemChosen":"topNavItem"} to="/games" onClick={()=>{highlightOption("Games")}}><IoGameController className='icon'/>Games</Link>}

  <div onClick={()=>{setShowClientMenu(showClientMenu?false:true)}} className="topNavItem"><ImUsers className='icon'/>Clients {!showClientMenu?<MdArrowDropDown/>:<MdArrowDropUp/>}</div>
  {showClientMenu?
  <div className='dropdown-content'>
    <Link className={chosenOption=='Manage clients'?"topNavItemChosen":"topNavItem"} to="/manageclients" onClick={()=>{highlightOption("Manage clients")}}>Manage clients</Link>
    <Link className={chosenOption=='Client rentals'?"topNavItemChosen":"topNavItem"} to="/rentals" onClick={()=>{highlightOption("Client rentals")}}> Client rentals</Link>
    <Link className={chosenOption=='Generate link'?"topNavItemChosen":"topNavItem"} to="/generatelink" onClick={()=>{highlightOption("Generate link")}}>Generate link</Link>
  </div>:null}
  {<Link className={chosenOption=='chats'?"topNavItemChosen":"topNavItem"} to="/chats" onClick={()=>{highlightOption("chats")}}><IoGameController className='icon'/>Chats</Link>}

       
          
        </div>

        <div className="signout" onClick={logOut}>
        <BiLogOut className='icon'/>
       <span>Sign out</span>
      
      </div>
    
      {chosenOption=='home'?
          
          <Dashboard userDetails={props.userDetails}/>
           
           
           :null}
        </div>
    );
}

export default HomePage;