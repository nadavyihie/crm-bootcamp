import React, { useEffect, useState,useMemo } from "react";
import Form from "../Form/Form.component";
import Modal from 'react-modal';
import axios from "axios";
import Table from "../../Pages/Table";

import "./css/users-style.css";
import { useRadioGroup } from "@material-ui/core";
function Users(props) {
    const [open, setOpen] = React.useState(false);
    const [usersdata,setUsersData]=useState([]);
    useEffect(() => {
        console.log(props.userDetails[0].id);
        // alert(props.userDetails.id);
        // console.log(props.userDetails);
        axios
          .get("http://localhost:8005/users/fetchallusers", {
            headers: {
              "managerID": props.userDetails[0].id,
            },
          })
          .then(function (response) {
           
            setUsersData(response.data);
            console.log(usersdata)
            
            // console.log(response.data.allUsers)
          
          })
          .catch(function (error) {
            // console.log(error);
          });
      },[]);
      const columns = React.useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id", // accessor is the "key" in the data
              },
          {
            Header: "Email",
            accessor: "email", // accessor is the "key" in the data
          },
          {
            Header: "Full name",
            accessor: "fullName",
          },
         

        //   {
        //     Header: "managerID",
        //     accessor: "managerID",
        //   },
        ],
        []
      );

      const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          display:'flex',
          "flex-direction":'column',
          "align-items":"center"
        },
      };
    
    const handleOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const sendInvitation = (e) => {
        const companyName=props.userDetails[0].companyName;
        const managerid=props.userDetails[0].id;
        const managerName=props.userDetails[0].fullName;
        console.log("manager name",managerName);
        e.preventDefault();
        const email = e.target.elements.email.value.trim();
        axios
          .post("http://localhost:8005/users/inviteuser", { managerName,managerid,companyName, email })
          .then(function (response) {
            alert("The email has been sent!");
          })
          .catch(function (error) {
            alert(error.response.data.message);
          });
      };
      const inputs = 
      [ { inputType: "text", inputName: "email", inputString: "Email" }]

    return (
    <div>
      <button onClick={handleOpen}>Invite user</button>
      <Modal
        isOpen={open}
    
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
       
        <span>Enter emai address:</span>
        
        <Form
          formStyle="loginForm"
          inputs={ inputs}
          submitAction={sendInvitation}
          buttonText="Invite"
        />
          <button onClick={handleClose}>close</button>
       
       
      </Modal>
           
            <Table columns={columns} data={usersdata} />
      
    </div>
  );
}

export default Users;




