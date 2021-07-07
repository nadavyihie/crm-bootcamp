import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Pages/Table";
import "./css/clients-style.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { Modal } from "@material-ui/core";
import Form from "../Form/Form.component";
import '../Form/css/loginForm-style.css'
function Clients(props) {


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalAction = () => {};

  const handleRemove = (row) => {
    setOpen(true);
    console.log(row);
  };

  const [open, setOpen] = useState(false);
  const [usersdata, setUsersData] = useState([]);
  useEffect(() => {
    // alert(props.userDetails.id);
    // console.log(props.userDetails);
    axios
      .post("http://localhost:991/clients/readAccountClients/", {
        id: props.userDetails[0].id,
      })
      .then(function (response) {
        console.log(response.data);

        setUsersData(response.data.clients);
        setUsersData(usersdata.map());
        console.log(response.data.clients);
        // console.log(response.data.allUsers)
      })
      .catch(function (error) {
        // console.log(error);
      });
  }, []);

  const columns = React.useMemo(
    () => [
      {
        Header: "ID",
        accessor: "id", // accessor is the "key" in the data
      },
      {
        Header: "Full name",
        accessor: "fullName",
      },
      {
        Header: "Email",
        accessor: "email", // accessor is the "key" in the data
      },
      {
        Header: "Address",
        accessor: "address", // accessor is the "key" in the data
      },

      {
        Header: "",
        accessor: "accountID",
        Cell: ({ row }) => (
          <div className="actionsContainer">
            <RiDeleteBin5Fill
              className="actionButton"
              onClick={() => handleRemove(row)}
            />
            <MdModeEdit className="actionButton" />
          </div>
        ), // accessor is the "key" in the data
      },
    ],
    []
  );



  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      display: "flex",
      "flex-direction": "column",
      "align-items": "center",
    },
  };
  const sendInvitation=()=>{}
  const inputs = 
      [ { inputType: "text", inputName: "email", inputString: "Email" }];
  return (
    <div>
      <div className="clientsTable">
        <Table columns={columns} data={usersdata} />
      </div>
   
    </div>
       
      
   
  );
}

export default Clients;
