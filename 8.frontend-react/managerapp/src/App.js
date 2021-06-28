import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import Signup from './Pages/Signup';
import Login from './Pages/Login';
import NotFound from './Pages/NotFound/NotFound.component';
import { useEffect, useState } from 'react';

import {

  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link
} from "react-router-dom";


 function  App() {
  const [userName,setUserName]=useState("");
  const [loading, setLoading] = useState(true);
  const [validToken,setValidToken]=useState(false);
  const token=localStorage.getItem("token");
 
  useEffect(()=>{
      
      const token=localStorage.getItem("token");
      if(token){
      axios.get('http://localhost:8005/registered', {
        headers: {
          'token': token
        }
      })
      .then(function (response) {
          
          // console.log(response.status);
          console.log(response.data.fullName)
          setUserName(response.data.fullName);
          setValidToken(true);
          
      })
      .catch(function (error) {
        setValidToken(false);
        
      });
    }
  
      setLoading(false);
    
    },[])

    if (loading) {
      return <div className="App">Loading...</div>;
    }

  return(


    <div className="App">
      { validToken?
        <div>
          <Login userName={userName}/>
        </div>
      
      :
      <div>
        <Signup/>    
      </div>}
    
    </div>


  );
}

export default App;





      {/* <Router>
        <Switch>
          {validToken?
          <div>
            <Route exact path="/" Redirect to="/homepage"/>
            <Route exact path="/homepage">
              <Login/>

            </Route>

          </div>
          
          :<div>
              <Route exact path='/signup'>
                <Signup/>
              </Route>  
            
          </div>}

          <Route path="/">
            <NotFound/>
          </Route>

        </Switch>


      </Router>
 */}