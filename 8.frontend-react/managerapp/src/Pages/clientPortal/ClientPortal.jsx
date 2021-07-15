import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./css/clientportal-style.css";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import Form from "../../Components/Form/Form.component";

import Table from "../Table";
function ClientPortal(props) {
  const [option, setOption] = useState("");
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
      .post("http://localhost:991/rentals/readClientRentals/", {
        id: clientDetails[0].id,
      })
      .then(function (response) {
        setRentalsData(response.data.rentals)
        for(var element of response.data.rentals)
        element.price+="$";
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
      Header: "",
      accessor: "imgURL",
      Cell: ({ row }) => (
        <div
          className="gameImg"
          style={{
            backgroundImage: `url("http://localhost:991/images/${row.original.imgURL}")`,
          }}
        ></div>
      ), // accessor is the "key" in the data
    },
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
      <div class="preload">
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
            <div class="sideBarItem">My details</div>
            <div class="sideBarItem" onClick={fetchRentals}>
              My rentals
            </div>
            <div class="sideBarItem">Rentals history</div>
            <div class="sideBarItem">Suggestions</div>
          </div>
          {option=="myRentals"?  <div >
        <Table  styleName="clientRentalTable" columns={rentalColumns} data={rentalsData} />
      </div>:null}
        </div>
      </div>
    );
  }
}

export default ClientPortal;
