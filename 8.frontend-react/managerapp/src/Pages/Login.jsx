import React from 'react';
import NavBar from '../Components/NavBar';
import './css/homepage-style.css'
function Login(props) {
    const logOut=()=>{
        localStorage.removeItem("token");
        window.location.reload();
    }
    return (
        <div className='homepage'>
        
            <div className='topNav'>    
                {props.userName}
                <button onClick={logOut}>Log out</button>
             </div>
        </div>
    );
}

export default Login;