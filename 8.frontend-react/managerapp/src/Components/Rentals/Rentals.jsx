import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiEraserFill } from 'react-icons/ri';
import Table from '../reactTable/Table';
import Loading from '../Loading/Loading';
import './css/rentals-style.css'
import { FcSearch } from "react-icons/fc";
import { useParams } from 'react-router-dom';
function Rentals(props) {
    const [showRentals,setShowRentals]=useState(false);
    const [loading,setLoading]=useState(true);
    const [clients,setClients]=useState([]);
    const[rentals,setRentals]=useState([]);

    const [filteredClientsData,setFilteredClientsData]=useState([]);
    useEffect(() => {
        const id=props.userDetails[0].managerID==-1?props.userDetails[0].id:props.userDetails[0].managerID;
        axios.post("http://localhost:991/clients/readAccountClients/",{id:id}).then(res=>{
        setClients(res.data.clients);
        setFilteredClientsData(res.data.clients);
        setTimeout(() => {
            setLoading(false);
        }, 500);
        }).catch(err=>{
            console.log(err);
        })
      },[]);
     
     const  handleSelectedClient=(client)=>{
        console.log(client.id);
        axios
        .post("http://localhost:991/rentals/readClientRentals/", {
          id: client.id,
        })
        .then(function (response) {
            // for(var element of response.data.rentals)
            // element.price+="$";
            console.log(response.data.rentals)
            setRentals(response.data.rentals)
            setShowRentals(true);
        })
        .catch(function (error) {}); 
    
    }


     const handleFilterData=(e)=>{
       setFilteredClientsData(clients.filter(client => client.fullName.includes(e.target.value)));
        // alert(e.target.value);
     }
    const  updateRental=(e,id)=>{
        
        e.preventDefault();
        const monthsNumber=e.target.elements.months.value;
  
     }
     const rentalColumns = [

        {
          Header: "Game name",
          accessor: "gameName",
        },
        {
          Header: "Start rental date",
          accessor: "start_rental_date", // accessor is the "key" in the data
        },
        {
            Header: "End rental date",
            accessor: "end_date", // accessor is the "key" in the data
          },
          {
            Header: "Price",
            accessor: "price",
            Cell: ({ row }) => (
               <div>{row.original.price+"$"}</div>
            ), // accessor is the "key" in the data // accessor is the "key" in the data
          },
       
          {
            Header: "Extend rental",
            accessor: "rental_months",
            Cell: ({ row }) => (
               
  
<form onSubmit={(e)=>updateRental(e,row.original.id)} style={{display:'flex',flexDirection:'column',alignItems:'center'}}>
<label style={{fontSize:"0.7em",marginBottom:'0.3vh'}} for="months">Months number(between {row.original.rental_months}and 12):</label>
  <input style={{marginBottom:'0.3vh'}} type="number"  name="months" min={row.original.rental_months} max="12"/>
  <button class="applyButton">Apply</button>
</form>

               
            ), // accessor is the "key" in the data // accessor is the "key" in the data
          },

      ];
    
  const clientsColumn = [
    {
        Header: "",
        accessor: "id",
        Cell: ({ row }) => (
           null
          ),
      },
    {
      Header: "",
      accessor: "fullName",
      Cell: ({ row }) => (
        <div className="ChosenClient"
          onClick={()=>handleSelectedClient(row.original)}
        >{row.original.fullName}</div>
      ), // accessor is the "key" in the data
    },
    
  ];
      if(loading){
          return(
              <Loading/>
          );
      }
    return (

        <div style={{display:'flex'}}>
            <div style={{height:"100vh",borderRight:'1px solid grey'}}>
            <div style={{margin: '1vw'}}>Choose a client to manage his rentals:</div>
     <input onChange={handleFilterData} className="searchClient" type='text' placeholder='Search a client'/>
      <Table styleName="chooseClient" columns={clientsColumn} data={filteredClientsData} />
      </div>
    {showRentals&&rentals?
     <div >
               <Table styleName="clientRentals" columns={rentalColumns} data={rentals} />

     </div>
     
     :null}
        </div>
    );
}

export default Rentals;