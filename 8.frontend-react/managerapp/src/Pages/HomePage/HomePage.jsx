
import React, { useState } from 'react';
import './css/homePage-style.css';
import './css/dropDownMenu-style.css';
import DelayLink from 'react-delay-link';
import { MdAccountCircle } from "react-icons/md";
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
        {<Link className={chosenOption=='home'?"topNavItemChosen":"topNavItem"} to="/" onClick={()=>{highlightOption("home")}}>Home</Link>}
        {<Link className={chosenOption=='users'?"topNavItemChosen":"topNavItem"} to="/users" onClick={()=>{highlightOption("users")}}>Users</Link>}
        {<div class="dropdown">
         
  <div onClick={()=>{setShowClientMenu(showClientMenu?false:true)}} className={chosenOption=='clients'?"topNavItemChosen":"topNavItem"}>Clients</div>
  {showClientMenu?
  <div >
    <Link to="/manageclients" onClick={()=>{highlightOption("clients")}}>Manage clients</Link>
    <Link to="/rentals" onClick={()=>{highlightOption("clients")}}> Client rentals</Link>
    <Link to="/generatelink" onClick={()=>{highlightOption("clients")}}>Generate link</Link>
  </div>:null}

          
          </div>}
        {<Link className={chosenOption=='Games'?"topNavItemChosen":"topNavItem"} to="/games" onClick={()=>{highlightOption("Games")}}>Games</Link>}
        </div>

        <div className="signout" onClick={logOut}>
        Sign out
      
      </div>
    
  
        </div>
    );
}

export default HomePage;