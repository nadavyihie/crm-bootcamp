import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "../reactTable/Table";
import "./css/crud-style.css";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import Form from "../Form/Form.component";
import Modal from "react-modal";
import "../Form/css/loginForm-style.css";
import Loading from "../Loading/Loading";
function Crud(props) {
    const [errMsg,setErrMsg]=useState("");
    const[inputValueStr,setInputValueStr]=useState([]);
  const [loading,setLoading]=useState(true);
  const [open, setOpen] = useState(false);
  const [actionType, setActionType] = useState("");
  const [userdata, setUsersData] = useState([]);
  const [row, setRow] = useState("");
    const newColumn=  {
        Header: "",
        accessor: "id",
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
      }
    let newArr=props.columnArr.map((x) => x);
    newArr.push(newColumn);

    
  const columns = React.useMemo(
    
    () => newArr,
    []
  );

  const handleModify = (row) => {
    setInputValueStr(row.original);
    console.log(inputValueStr)
    setActionType("modify");
    setRow(row);
    setOpen(true);
  };

  const handleAdd=()=>{
    setActionType("add");
    setOpen(true);
  }


  const handleRemoveOption = (row) => {
    setActionType("remove");
    setRow(row);
    setOpen(true);

  };


  const updateTable = () => {
    setLoading(true);
    let object = "";
    let objectData="";
    props.fetchData().then(object=>{
        for (var prop in object.data) {
            objectData=object.data[prop];
            break;
        }
        setUsersData(objectData);
    })
    .catch(err=>{
        console.log(err);
    })

    setTimeout(() => {
      setLoading(false);
  }, 1000);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

const remove=()=>{
    setLoading(true);
    props.confirmRemove(row.original.id).then(()=>{
        updateTable();
        handleClose();
    }).catch(err=>{
        console.log(err);
    })
}
  const add= (e)=>{
      setLoading(true);
    props.confirmAdd(e).then(()=>{
        updateTable();
        handleClose();
    }).catch(err=>{
        console.log(err);
    })
  }


  const update=(e)=>{
     
    setLoading(true);
      props.confirmUpdate(e,row.original.id).then(()=>{
        updateTable();
        handleClose();

      })
      .catch(err=>{
          console.log(err);
      });
     ;  }

  useEffect(() => {
  
    updateTable();
  //   setTimeout(() => {
  //     setLoading(false);
  // }, 1500);
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

  if(loading){
    return(
    
    <Loading/>
    );
  }
  return (
    <div style={{marginLeft:'25vw'}}>
            <button className="crudButton" onClick={handleAdd}>+Add a {props.crudType}</button>
      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        {actionType == "remove" ? (
          <div className="removeModal">
            <span>Are you sure you want to remove this {props.crudType}? </span>
            <button className="crudButton" onClick={remove}>
              Ok
            </button>
            <button className="crudButton" onClick={handleClose}>
              Cancel
            </button>
          </div>
        ) : actionType == "modify" ? (
          <div className="modifyModal">
            <Form
              formStyle="loginForm"
              inputs={ props.addFormInput}
              submitAction={update}
              buttonText="Ok"
              defaultInputs={true}
              inputValueStr={inputValueStr}
            />
            <button className="usersButton" onClick={handleClose}>
              Cancel
            </button>
          </div>
        ) : <div className="modifyModal">
              <Form
              formStyle="loginForm"
              inputs={ props.addFormInput }
             
              submitAction={add}
              buttonText="Ok"
              
              
            />
            <button className="usersButton" onClick={handleClose}>
              Cancel
            </button>
          
          </div>}
          
      </Modal>
      <div >
        <Table columns={columns} data={userdata} />
      </div>
      
    </div>
  );
}

export default Crud;
