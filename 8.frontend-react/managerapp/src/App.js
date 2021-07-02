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
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route,
  Link,
} from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage";
import SignIn from "./Pages/SignIn/SignIn";
import SignUp from "./Pages/Signup/SignUp";
function App() {
  const [tokenExists, setTokenExists] = useState(false);

  return (
    <Router>
      <div>
        <Route  path='/'>
        {tokenExists ? <HomePage /> : <Redirect to="/login" />}
        </Route>
        <Switch>
          <Route exact path="/about">
            <About />
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

// const [userDetails, setUserDetails] = useState(null);
// const [loading, setLoading] = useState(true);
// const [validToken, setValidToken] = useState(false);
// const token = localStorage.getItem("token");

// useEffect(() => {
//   const token = localStorage.getItem("token");
//   if (token) {
//     axios
//       .get("http://localhost:8005/users/registered", {
//         headers: {
//           token: token,
//         },
//       })
//       .then(function (response) {
//         // console.log(response.status);
//         console.log(response.data);
//         setUserDetails(response.data.userDetails);

//         setValidToken(true);
//         setLoading(false);
//       })
//       .catch(function (error) {
//         setValidToken(false);
//         setLoading(false);
//       });
//     // setLoading(false);
//   } else {
//     setLoading(false);
//   }
// }, []);

// if (loading) {
//   return <div>Loading...</div>;
// }

// return (
//   <Router>
//     <Switch>
//       <Route exact path="/:token">
//         <Signup userType="user" />
//       </Route>
//       <Route exact path="/">
//         <div className="App">
//           {validToken ? (
//             <div>
//               <Login userDetails={userDetails} />
//             </div>
//           ) : (
//             <div>
//               <Signup userType="admin"/>
//             </div>
//           )}
//         </div>
//       </Route>

//       <Route exact path="/forgotpassword">
//         <ForgotPassword />
//       </Route>

//       <Route exact path="/resetpassword/:token">
//         <ResetPassword />
//       </Route>
//     </Switch>
//   </Router>
// );

export default App;
