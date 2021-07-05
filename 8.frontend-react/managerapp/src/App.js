// import logo from "./logo.svg";
// import "./App.css";
// import axios from "axios";
// import Signup from "./Pages/Signup";
// import Login from "./Pages/Login";
// import NotFound from "./Pages/NotFound/NotFound.component";
// import ForgotPassword from "./Pages/ForgotPassword";
// import ResetPassword from "./Pages/ResetPassword";

// import UsersTable from "./Components/UsersTable";

import { useEffect, useState } from "react";
import axios from "axios";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import Users from "./Components/Users/Users.component";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/Signup/SignUp";
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
function App() {

  const [tokenExists, setTokenExists] = useState(false);
  const [loading,setLoading]=useState(true);
  const [userDetails,setUserDetails]=useState(null);
   useEffect(()=>{
      
      const token=localStorage.getItem("token");
      console.log(token);
      if(token){
      axios.get('http://localhost:8005/users/registered', {
        headers: {
          'token': token
        }
      })
      .then(function (response) {
          
          // console.log(response.status);
       
          setUserDetails(response.data);
        
          setTokenExists(true);
          setLoading(false);
      })
      .catch(function (error) {
        setTokenExists(false);
        setLoading(false);
        
      });
      // setLoading(false);
    }
    else{
      setLoading(false);
    }
  
    
    },[])

    if (loading) {
      return <div>Loading...</div>;
    }


  return (
    
    <Router>
      <div>
     
      <Route exact path='/resetpassword/:token'>
              <ResetPassword/> 
            </Route>
            <Route exact path="/signup/:token">
           <SignIn signAction="invited" />
          </Route>
          <Route exact path="/login">
           {tokenExists?<Redirect to='/'/>:<SignIn signAction="signin"/>}
          </Route>
          <Route exact path="/signup">
          {tokenExists?<Redirect to='/'/>:<SignIn signAction="signup" />}
          </Route>
          
          <Route exact path="/forgotpassword">
          {tokenExists?<Redirect to='/'/>: <ForgotPassword />}
          
          </Route>

    
        <Route   path='/'>
        {tokenExists ? <HomePage userDetails={userDetails}/> : <Redirect to="/login" />}
        </Route>
        <Switch>
          <Route exact path="/users">
          {tokenExists ?<Users userDetails={userDetails}/>:<Redirect to='/login'/>}
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>       
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div>
      <h2>Home</h2>
    </div>
  );
}

function About() {
  return (
    <div>
      <h2>About</h2>
    </div>
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}


export default App;
