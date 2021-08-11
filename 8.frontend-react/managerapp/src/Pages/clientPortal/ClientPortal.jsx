import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/clientportal-style.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import Form from "../../Components/Form/Form.component";

import Table from "../../Components/reactTable/Table"
function ClientPortal(props) {
  const [option, setOption] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [rentalsData, setRentalsData] = useState([]);
  const [controller, setController] = useState("login");
  const [submitMsg, setSubmitMsg] = useState(["", ""]);
  const [accountDetails, setAccountDetails] = useState([]);
  const [accountID, setAccountID] = useState(useParams().accountID);
  const [loading, setLoading] = useState(true);
  const [clientDetails, setClientDetails] = useState([]);
  useEffect(() => {

    axios
      .get("http://localhost:8005/users/readaccount", {
        headers: {
          id: accountID,
        },
      })
      .then(function (response) {
        setAccountDetails(response.data);

        setTimeout(() => {
          setLoading(false);
        }, 2000);
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }, []);

  const fetchRentals = () => {
    axios
      .post("http://localhost:991/rentals/readClientRentalsForPortal/", {
        id: clientDetails[0].id,
      })
      .then(function (response) {
       
        for(var element of response.data.rentals)
        element.price+="$";
        setRentalsData(response.data.rentals)
        setOption('myRentals')
      })
      .catch(function (error) {});
  };


  const fetchRentalsHistory = () => {
    axios
      .post("http://localhost:991/rentals/readClientRentalsForPortalHistory/", {
        id: clientDetails[0].id,
      })
      .then(function (response) {
     
        for(var element of response.data.rentals)
        element.price+="$";
        setRentalsData(response.data.rentals)
        setOption('myRentals')
      })
      .catch(function (error) {});
  };


  const fetchClientDetails = (e) => {
    const phoneNumber = e.target.elements.phoneNumber.value.trim();
    // console.log(accountDetails[0].id,phoneNumber);
    axios
      .post("http://localhost:991/clients/readClientDetails/", {
        accountID: accountDetails[0].id,
        phone: phoneNumber,
      })
      .then(function (response) {
        setLoading(true);
        setClientDetails(response.data.client);

        setTimeout(() => {
          setLoading(false);
        }, 1000);
        setController("home");
      })
      .catch(function (error) {
        setSubmitMsg([
          "Cannot sign you in, please check your phone number or try again later",
          "#F8D7DA",
        ]);
      });


  };

  const inputs = [
    {
      inputType: "text",
      inputName: "phoneNumber",
      inputString: "Phone number",
    },
  ];

  const rentalColumns = [
   
    {
      Header: "Game name",
      accessor: "gameName",
    },
    {
      Header: "Rental date",
      accessor: "start_rental_date", // accessor is the "key" in the data
    },
    {
      Header: "Return date ",
      accessor: "end_date", // accessor is the "key" in the data
    },
    {
      Header: "Price",
      accessor: "price", // accessor is the "key" in the data
    },
  ];

  if (loading) {
    return (
      <div class="preload">
        <div className="joystick"></div>
      </div>
    );
  }
  if (controller == "login") {
    return (
      <div >
        <div className="clientPortal">
          <div className="submitMsg" style={{ backgroundColor: submitMsg[1] }}>
            {submitMsg[0]}
          </div>
          <div className="clientTitle">{`${accountDetails[0].companyName} client portal`}</div>
          <div className="submitTitle">Please, enter your phone number:</div>
          <div className="submitContainer">
            <Form
              formStyle="loginForm"
              inputs={inputs}
              submitAction={fetchClientDetails}
              buttonText="Submit"
            />
          </div>
        </div>
      </div>
    );
  }
  if (controller == "home") {
    return (
      <div class="preload">
        <div className="clientPortalHome">
          <div className="HomeClientTitle">{clientDetails[0].fullName}</div>
          <div class="sideBar">
            <div class="sideBarItem" onClick={()=>setOption("myDetails")}>My details</div>
            <div class="sideBarItem" onClick={fetchRentals}>
              My rentals
            </div>
            <div class="sideBarItem" onClick={fetchRentalsHistory}>Rentals history</div>
           
          </div>
          <div style={{marginTop:'10vh'}}>
          {option=="myRentals"?  <div >
        <Table  columns={rentalColumns} data={rentalsData} />
      </div>:
      
      option=='myDetails'?<div style={{backgroundColor:'#5B586C',padding:'2vw',borderRadius:'20px',opacity:'0.9'}}>
      <div style={{color:'white',fontSize:'2em'}}>Full name:{clientDetails[0].fullName}</div>
      <div style={{color:'white',fontSize:'2em'}}> Email:{clientDetails[0].email}</div>
      <div style={{color:'white',fontSize:'2em'}}>Address:{clientDetails[0].address}</div>
     </div>
      :null
      
      }
      </div>
        </div>
        <div className='chat'>  <iframe src={`http://localhost:9000/client-side?username=${clientDetails[0].fullName}&phoneNumber=${clientDetails[0].phoneNumber}`} id="chatIframe" width='100%' height='100%' ></iframe></div>
      </div>
    );
  }
}

export default ClientPortal;
