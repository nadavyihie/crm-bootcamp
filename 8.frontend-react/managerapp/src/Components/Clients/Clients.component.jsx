import axios from "axios";
import React, { useState } from "react";
import Crud from "../CRUD/CRUD.component";
import './css/clients-style.css'
function Clients(props) {
  const [submitMsg,setSubmitMsg]=useState(["",""]);
const  fetchClients =  async() => {
 
  try {
      const res=  await axios.post("http://localhost:991/clients/readAccountClients/",{id:props.userDetails[0].id});
  //   console.log(res)

  return res;
   } catch (err) {
      throw err;
   }
}

const removeClient=async (id)=>{
  try{
      const res=await axios.post("http://localhost:991/clients/remove/",{id:id});
      setSubmitMsg(["The client has been deleted","#D4EDDA"]);

      return res
  }
  catch(err){
    setSubmitMsg(["The client could not bee deleted right now. try again later","#F8D7DA"]);

      throw err;
      
  }
  
}
const updateClient=async (e,id)=>{
      const email = e.target.elements.email.value.trim();
    const fullName = e.target.elements.fullName.value.trim();
    const phoneNumber = e.target.elements.phoneNumber.value.trim();
    const address = e.target.elements.address.value.trim();
  const arr={id:id,email:email,fullName:fullName,phoneNumber:phoneNumber,address:address};
  try{
    
      const res=await axios.post("http://localhost:991/clients/update/",arr);
      setSubmitMsg(["The client details successfully updated","#D4EDDA"]);
      return res
  }
  catch(err){
    setSubmitMsg(["The client  details could not bee updated right now. try again later","#F8D7DA"]);
      throw err;
  }
  
}

const addClient=async(e)=>{
  const accountID=props.userDetails[0].managerID!=-1?props.userDetails[0].managerID:props.userDetails[0].id;
    const email = e.target.elements.email.value.trim();
    const fullName = e.target.elements.fullName.value.trim();
    const phoneNumber = e.target.elements.phoneNumber.value.trim();
    const address = e.target.elements.address.value.trim();
  const arr={accountID:accountID,email:email,fullName:fullName,phoneNumber:phoneNumber,address:address};
  try{
      const res=await axios.post("http://localhost:991/clients/create/",arr);
      setSubmitMsg(["The client has been added","#D4EDDA"]);

      return res
  }
  catch(err){
    setSubmitMsg(["The client could not bee added right now. try again later","#F8D7DA"]);
    throw err;
  }
  

}


  const columnArr = [
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
    
  ];


  const addFormInput=[{inputType: "text", inputName: "fullName", inputString: "Full name"},
                  {inputType: "text", inputName: "email", inputString: "Email"},
                  {inputType: "text", inputName: "phoneNumber", inputString: "Phone number"},
                  {inputType: "text", inputName: "address", inputString: "Address"}];

  return (
    <div style={{marginLeft:'25vw'}}>
     <div style={{height:'4vh'}}></div>
         <div className="clientsMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>

      <Crud addFormInput={addFormInput}  confirmAdd={addClient} confirmUpdate={updateClient} crudType='client' columnArr={columnArr} fetchData={fetchClients} confirmRemove={removeClient}/>
      </div>
  
  );
}

export default Clients;
