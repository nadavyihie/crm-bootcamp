import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import NotFound from "./Pages/NotFound/NotFound.component";
import ForgotPassword from "./Pages/ForgotPassword";
import ResetPassword from "./Pages/ResetPassword";
import { useEffect, useState } from "react";

import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";

function App() {
  const [userDetails, setUserDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:8005/users/registered", {
          headers: {
            token: token,
          },
        })
        .then(function (response) {
          // console.log(response.status);
          console.log(response.data);
          setUserDetails(response.data.userDetails);

          setValidToken(true);
          setLoading(false);
        })
        .catch(function (error) {
          setValidToken(false);
          setLoading(false);
        });
      // setLoading(false);
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Switch>
        <Route exact path="/:token">
          <Signup userType="user" />
        </Route>
        <Route exact path="/">
          <div className="App">
            {validToken ? (
              <div>
                <Login userDetails={userDetails} />
              </div>
            ) : (
              <div>
                <Signup userType="admin"/>
              </div>
            )}
          </div>
        </Route>

        <Route exact path="/forgotpassword">
          <ForgotPassword />
        </Route>

        <Route exact path="/resetpassword/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;