import Loading from "./Components/Loading/Loading";
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
import Clients from "./Components/Clients/Clients.component";
import SignIn from "./Pages/SignIn/SignIn";

import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword/ResetPassword";
import Games from "./Components/Games/Games.component";
import GenerateLink from "./Components/GenerateLink/GenerateLink";
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
      <Loading />
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
          <Route exact path="/manageclients">
          {tokenExists ?<Clients userDetails={userDetails}/>:<Redirect to='/login'/>}
          </Route>   
          <Route exact path="/generatelink">
          {tokenExists ?<GenerateLink userDetails={userDetails}/>:<Redirect to='/login'/>}
          </Route>
          <Route exact path="/games">
          {tokenExists ?<Games userDetails={userDetails}/>:<Redirect to='/login'/>}
          </Route>          
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.


export default App;
