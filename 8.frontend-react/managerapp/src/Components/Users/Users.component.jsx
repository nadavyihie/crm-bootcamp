import React, { useEffect, useState,useMemo } from "react";
import Form from "../Form/Form.component";
import PageUnavailable from "../PageUnavailable/PageUnavailable.component";
import Loading from "../Loading/Loading";
import Modal from 'react-modal';
import axios from "axios";
import Table from "../reactTable/Table.jsx"
import "./css/users-style.css";
import { useRadioGroup } from "@material-ui/core";
import {RiDeleteBin5Fill} from 'react-icons/ri';
import {MdModeEdit} from 'react-icons/md';
function Users(props) {
    const[loading,setLoading]=useState(true);
    const [pageUnavailable,setPageUnavailable]=useState(false)
    const [open, setOpen] = React.useState(false);
    const [usersData,setUsersData]=useState([]);
    const [submitMsg,setSubmitMsg]=useState(["",""]);
    const [row, setRow] = useState("");
    const [action,setAction]=useState("")
    useEffect(() => {
      
        console.log(props.userDetails[0].id);
      const id=props.userDetails[0].managerID==-1?props.userDetails[0].id:props.userDetails[0].managerID
     
      axios
          .get("http://localhost:8005/users/fetchallusers", {
            headers: {
              "managerID": id,
            },
          })
          .then(function (response) {
           
            setUsersData(response.data);
            // console.log(response.data)
            
            // console.log(response.data.allUsers)
          
          })
          .catch(function (error) {
            setPageUnavailable(true)
            // console.log(error);
          });
          setTimeout(() => {
            setLoading(false);
          }, 700);
        
      },[]);
      const columns = React.useMemo(
        () => [
           
          {
            Header: "Email",
            accessor: "email", // accessor is the "key" in the data
          },
          {
            Header: "Full name",
            accessor: "fullName",
          },
          {
            Header: "",
            accessor: "id", 
            Cell: ({ row }) => (
              <div style={{alignItems:'center'}}>
                <RiDeleteBin5Fill
                  className="actionButton"
                  onClick={() => handleRemove(row)}
                />
           
              </div>
            ), // accessor is the "key" in the data// accessor is the "key" in the data
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

      const handleRemove = (row) => {
        setAction("remove");
        setRow(row);
        setOpen(true);
    
      };
      const removeFromTable=(id)=>{
       const tempusersData= [...usersData];
       let index=0
       for( var i = 0; i < tempusersData.length; i++){ 
    
        if ( tempusersData[i].id === id) { 
    
         index=i;
          break;
          }
    
    }
    tempusersData.splice(index,1)
   


    setUsersData(tempusersData)  
    console.log(usersData)

      }

    const removeUser=async ()=>{
      handleClose();
      try{
       const res=await axios.post("http://localhost:8005/users/removeAccount",{id:row.original.id})
       setSubmitMsg(["The user has been deleted","#D4EDDA"]);
       removeFromTable(row.original.id);
      }
      catch(err){
        setSubmitMsg(["The user could not bee deleted at this moment. please try again later","#F8D7DA"]);

      }
    }
    const handleOpen = (action) => {
      setAction(action)
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

      const sendInvitation = (e) => {
        handleClose();
        const companyName=props.userDetails[0].companyName;
        const managerid=props.userDetails[0].id;
        const managerName=props.userDetails[0].fullName;
        console.log("manager name",managerName);
        e.preventDefault();
        const email = e.target.elements.email.value.trim();
        axios
          .post("http://localhost:8005/users/inviteuser", { managerName,managerid,companyName, email })
          .then(function (response) {
            setSubmitMsg(["The invitation mail has been sent!","#D4EDDA"]);

  
          })
          .catch(function (error) {
            setSubmitMsg(["We could not send the email right now,please try again later.","#F8D7DA"]);
          });

      };
      const inputs = 
      [ { inputType: "text", inputName: "email", inputString: "Email" }]

      if(loading){
        return(
          <Loading />
             );
      }
      if(pageUnavailable){
        return(
          <PageUnavailable/>        )
      }
    return (
    <div style={{marginLeft:'25vw'}}>
      <div className="inviteMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>

      <button className="usersButton inviteButton" onClick={()=>{handleOpen('invite')}}>Invite user</button>
      <Modal
        isOpen={open}
    
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
       {action=='invite'?
       
       
       <div style={{display:"flex",flexDirection:'column',alignItems:'center'}}>
        <span>Enter emai address:</span>
        
        <Form
          formStyle="loginForm"
          inputs={ inputs}
          submitAction={sendInvitation}
          buttonText="Invite"
        />
          </div>
        
       :action=="remove"?
       
       <div style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
            <span style={{marginBottom:'4vh'}}>Are you sure you want to remove this account? </span>
            <button className="usersButton" onClick={removeUser}>
              Ok
            </button>
            </div>
       :null
       
       }
                 <button className="usersButton" onClick={handleClose}>close</button>

      </Modal>
      {usersData? <Table  columns={columns} data={usersData} />:null}
                    
           

    </div>
  );

  
}

export default Users;




