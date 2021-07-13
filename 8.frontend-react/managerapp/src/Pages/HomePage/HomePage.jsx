
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
    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href='/na';
      };
      const highlightOption=(option)=>{
        setChosenOption(option);
      }

    return (
        <div className="homepage">
            <div className="titleDiv">
            <span className="companyTitle">{props.userDetails[0].companyName}</span>
            </div>
           
        <div className="topNav">
        {<Link className={chosenOption=='home'?"topNavItemChosen":"topNavItem"} to="/" onClick={()=>{highlightOption("home")}}>Home</Link>}
        {<Link className={chosenOption=='users'?"topNavItemChosen":"topNavItem"} to="/users" onClick={()=>{highlightOption("users")}}>Users</Link>}
        {<div class="dropdown">
         
  <div className={chosenOption=='clients'?"topNavItemChosen":"topNavItem"}>Clients</div>
  <div className="dropdown-content">
    <Link to="/manageclients" onClick={()=>{highlightOption("clients")}}>Manage clients</Link>
    <Link to="/clientrentals" onClick={()=>{highlightOption("clients")}}> Client rentals</Link>
    <Link to="/generatelink" onClick={()=>{highlightOption("clients")}}>Generate link</Link>
  </div>

          
          </div>}
        {<Link className={chosenOption=='Rentals'?"topNavItemChosen":"topNavItem"} to="/rentals" onClick={()=>{highlightOption("Rentals")}}>Rentals</Link>}
        {<Link className={chosenOption=='Games'?"topNavItemChosen":"topNavItem"} to="/games" onClick={()=>{highlightOption("Games")}}>Games</Link>}
        </div>

        <div className="logout" onClick={logOut}>
        Sign out
      
      </div>
      <div className="userName"><MdAccountCircle className="userIcon"/>
         {props.userDetails[0].fullName}
      </div>
  
        </div>
    );
}

export default HomePage;