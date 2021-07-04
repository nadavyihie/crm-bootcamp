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
    //TODO:Error: Too many re-renders. React limits the number of renders to prevent an infinite loop.http://localhost:3000/users


  return (
    
    <Router>
      <div>
        <Switch>
      <Route exact path='/resetpassword/:token'>
              <ResetPassword/> 
            </Route>
            <Route exact path="/signup/:token">
           <SignIn signAction="invited" />
          </Route>

        <Route   path='/'>
        {tokenExists ? <HomePage userDetails={userDetails}/> : <Redirect to="/login" />}
        </Route>
        </Switch>
        <Switch>
          <Route exact path="/users">
            <Users userDetails={userDetails}/>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard />
          </Route>
          <Route exact path="/login">
           {tokenExists?<Redirect to='/'/>:<SignIn signAction="signin"/>}
          </Route>
          <Route exact path="/signup">
           <SignIn signAction="signup" />
          </Route>
          <Route exact path="/forgotpassword">
           <ForgotPassword />
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
