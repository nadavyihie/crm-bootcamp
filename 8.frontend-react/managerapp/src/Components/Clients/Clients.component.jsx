import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../../Pages/Table";
import "./css/clients-style.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import Form from "../Form/Form.component";
import Modal from 'react-modal';
import { fetchClients } from "./scripts/serverRequests";
import '../Form/css/loginForm-style.css';
function Clients(props) {


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const modalAction = () => {};

  const handleRemove = (row) => {
    setActionType("remove");
    setOpen(true);
    console.log(row);
  };

  const [open, setOpen] = useState(false);
  const [actionType,setActionType]=useState("");
  const [usersdata, setUsersData] = useState([]);

  useEffect(() => {
   let users="";
    fetchClients(props.userDetails[0].id).then((users)=>{
     setUsersData(users.data.clients);
    })
    .catch((err)=>{
      console.log(err);
    }
    
   
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
    }
  };
  const sendInvitation=()=>{}
  const inputs = 
      [ { inputType: "text", inputName: "email", inputString: "Email" }];
  return (
    <div>
      <Modal
       isOpen={open}
    
       onRequestClose={handleClose}
       style={customStyles}
       contentLabel="Example Modal"
      >{actionType=="remove"?
    <div className="removeModal">
      <span>Are you sure you want to remove this client? </span>
      <button className="clientsButton">Ok</button>
      <button className="clientsButton">Cancel</button>
    </div>
    :null}
 
        </Modal>
      <div className="clientsTable">
        <Table columns={columns} data={usersdata} />
      </div>
   
    </div>
  );
}

export default Clients;
