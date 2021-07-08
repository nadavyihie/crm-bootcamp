import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Pages/Table";
import "./css/clients-style.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import Form from "../Form/Form.component";
import Modal from "react-modal";
import { updateClient,fetchClients, removeClient } from "./scripts/serverRequests";
import "../Form/css/loginForm-style.css";
function Clients(props) {
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [usersdata, setUsersData] = useState([]);
  const [row, setRow] = useState("");

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
        Header: "Phone number",
        accessor: "phoneNumber", // accessor is the "key" in the data
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
              onClick={() => handleRemoveOption(row)}
            />
            <MdModeEdit
              className="actionButton"
              onClick={() => handleModify(row)}
            />
          </div>
        ), // accessor is the "key" in the data
      },
    ],
    []
  );

  const handleModify = (row) => {
    setActionType("modify");
    setRow(row);
    setOpen(true);
  };

  const confirmUpdate=(e)=>{
   
    const email = e.target.elements.email.value.trim();
    const fullName = e.target.elements.fullName.value.trim();
    const phoneNumber = e.target.elements.phoneNumber.value.trim();
    const address = e.target.elements.address.value.trim();
    
    updateClient(row.original.id,email,fullName,phoneNumber,address)
    .then( (res) => {
       updateClientsTable(handleClose);


    })
    .catch((err) => {
      console.log(err);
    });

  }

  const handleRemoveOption = (row) => {
    setActionType("remove");
    setRow(row);
    setOpen(true);

  };
  const confirmRemove = () => {
    removeClient(row.original.id)
      .then((res) => {
        updateClientsTable(handleClose);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updateClientsTable = (callback) => {
    let users = "";
    fetchClients(props.userDetails[0].id)
      .then((users) => {
        setUsersData(users.data.clients);
        callback();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    updateClientsTable();
  }, []);

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
  const modifyInput = [
    { inputType: "text", inputName: "email", inputString: "Email" },
  ];
  return (
    <div>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {actionType == "remove" ? (
          <div className="removeModal">
            <span>Are you sure you want to remove this client? </span>
            <button className="clientsButton" onClick={confirmRemove}>
              Ok
            </button>
            <button className="clientsButton" onClick={handleClose}>
              Cancel
            </button>
          </div>
        ) : actionType == "modify" ? (
          <div className="modifyModal">
            <Form
              formStyle="loginForm"
              inputs={ [{inputType: "text", inputName: "fullName", inputString: row.original.fullName},
                {inputType: "text", inputName: "email", inputString: row.original.email},
                {inputType: "text", inputName: "phoneNumber", inputString: row.original.phoneNumber},
                {inputType: "text", inputName: "address", inputString: row.original.address}] }
              submitAction={confirmUpdate}
              buttonText="Ok"
              defaultInputs={true}
              
            />
            <button className="usersButton" onClick={handleClose}>
              Cancel
            </button>
          </div>
        ) : null}
      </Modal>
      <div className="clientsTable">
        <Table columns={columns} data={usersdata} />
      </div>
    </div>
  );
}

export default Clients;
