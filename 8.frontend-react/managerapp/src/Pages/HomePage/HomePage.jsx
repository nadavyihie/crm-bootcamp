import React from 'react';
import './css/homePage-style.css'
import {
    BrowserRouter as Router,
    Switch,
    Redirect,
    Route,
    Link,
  } from "react-router-dom";
function HomePage(props) {
    const logOut = () => {
        localStorage.removeItem("token");
        window.location.href='/na';
      };

    // console.log(props.userDetails);
    return (
        <div className="homepage">
            
           
        <div className="topNav">
        {/* <Link to="/users" className="topNavItem" >users</Link> */}
        {<Link className="topNavItem" to="/users">users</Link>}

        <Link to="/clients" className="topNavItem">Clients </Link>
        <div className="topNavItem">option </div>
        </div>
        <div className="logout" onClick={logOut}>
        Sign out
      </div>
      <div className="username">Hi, {props.userDetails[0].fullName}</div>
        </div>

        
    );
}

export default HomePage;