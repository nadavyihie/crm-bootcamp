import axios from "axios";
import React, { useEffect, useState } from "react";
import { RiEraserFill } from "react-icons/ri";
import Table from "../reactTable/Table";
import Loading from "../Loading/Loading";
import "./css/rentals-style.css";
import Modal from "react-modal";

import "../../css/searchbox-style.css";
import { FcSearch } from "react-icons/fc";
import { useParams } from "react-router-dom";
function Rentals(props) {
  const [pageUnavailable,setPageUnavailable]=useState(false)
  const [rentalAdded,setRentalAdded]=useState(false)
  const [open, setOpen] = useState(false);
  const [showRentals, setShowRentals] = useState(false);
  const [loading, setLoading] = useState(true);
  const [clients, setClients] = useState([]);
  const [games, setGames] = useState([]);
  const [clientID, setClientID] = useState("");
  const [rentals, setRentals] = useState([]);
  const [rentalOption, setRentalOption] = useState("current");
  const [filteredClientsData, setFilteredClientsData] = useState([]);
  const [rentalsHistory, setRentalsHistory] = useState(true);
  const [submitMsg,setSubmitMsg]=useState(["",""]);
  const [noRentals, setNorentals] = useState(false);
  useEffect(() => {
    fetchRentals("current");
  }, []);

  const addRental = (e) => {
    e.preventDefault();
    const months = e.target.elements.months.value;
    const clientName = e.target.elements.client.value;
    const gameName = e.target.elements.game.value;
    let gameID = "";
    let clientID = "";
    for (const client of clients) {
      if (client.fullName == clientName) {
      
        clientID = client.id;
  
        break;
      }
    }
    for (const game of games) {
      
      if (game.gameName == gameName) {
        gameID = game.id;
        break;
      }
    }
    console.log("cID:"+clientID+"gID:"+gameID+"m:"+months)
    axios.post("http://localhost:991/rentals/create/",{"gameID":gameID,"clientID":clientID,"rental_months":months}).then((res)=>{
      setSubmitMsg(["A new rental has been added","#D4EDDA"]);
      fetchRentals("current");
    })
    .catch(err=>{
      setSubmitMsg(["The rental could not bee added at this moment. please try again later","#F8D7DA"]);
    })

    handleClose();
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleSelectedClient = (id) => {
    setClientID(id);
    setShowRentals(true);
    console.log(rentalOption);
  };

  const handleAddRental = () => {
    const id =
      props.userDetails[0].managerID == -1
        ? props.userDetails[0].id
        : props.userDetails[0].managerID;
    axios
      .post(`http://localhost:991/clients/readAccountClients/`, { id: id })
      .then((res) => {
        setOpen(true);
        setClients(res.data.clients);
        axios
          .post(`http://localhost:991/games/readAll/`)
          .then((res) => {
            console.log(res.data.games);
            setGames(res.data.games);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const fetchRentals = (option) => {
    const id =
      props.userDetails[0].managerID == -1
        ? props.userDetails[0].id
        : props.userDetails[0].managerID;

    const link = option == "current" ? "readAllRentals" : "readRentalsHistory";
    axios
      .post(`http://localhost:991/rentals/${link}/`, { id: id })
      .then((res) => {
        setRentals(res.data.rentals);
        setRentalOption("current");
        console.log(res.data);
      
      })
      .catch((err) => {
        setNorentals(true);
        console.log(err);
      });
      setTimeout(() => {
        setLoading(false);
      }, 500);
  };
  const handleFilterData = (e) => {
    setFilteredClientsData(
      clients.filter((client) => client.fullName.includes(e.target.value))
    );
    // alert(e.target.value);
  };
  const updateRental = (e, id) => {
    e.preventDefault();
    const monthsNumber = e.target.elements.months.value;
  };
  const rentalColumns = [
    {
      Header: "Client name",
      accessor: "clientName",
    },

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
      Cell: ({ row }) => <div>{row.original.price + "$"}</div>, // accessor is the "key" in the data // accessor is the "key" in the data
    },
  ];

  const clientsColumn = [
    // {
    //     Header: "",
    //     accessor: "id",
    //     Cell: ({ row }) => (
    //        null
    //       ),
    //   },
  ];

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

  if (loading) {
    return <Loading />;
  }
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

<div className="rentalMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>


      {/* <input onChange={handleFilterData} className="searchBox" type='text' placeholder='Search a client'/>
            <div style={{display:'flex',flexDirection:'column',alignItems:"center",marginTop:'5vh',position:'fixed',left:'0',marginLeft:'20vw'}}>
    <div style={{fontSize:'120%',fontWeight:"bold",marginBottom:'1.5vh'}}>Clients list:</div>
      {filteredClientsData.map(client=>(<div onClick={()=>{handleSelectedClient(client.id)}} className="client">{client.fullName}</div>))}
      </div>
    {showRentals? */}

      <div style={{ marginTop: "10vh" }}>
        <button className="purpleButton addRental" onClick={handleAddRental}>
          Add rental
        </button>
        <div className="rentalsMenu">
          {/* <div tabindex="1" onClick={()=>{fetchRentals('create')}}>Create rental</div> */}
          <div
            tabindex="2"
            onClick={() => {
              setSubmitMsg("")
              fetchRentals("current");
            }}
          >
            Current rentals
          </div>
          <div
            tabindex="3"
            onClick={() => {
              setSubmitMsg("")
              fetchRentals("history");
            }}
          >
            Rentals history
          </div>
        </div>

        {rentalOption == "current" || rentalOption == "history" ? (
          !noRentals ? (
            <Table
              styleName="clientRentals"
              columns={rentalColumns}
              data={rentals}
            />
          ) : (
            <div style={{ display: "flex", justifyContent: "center" }}>
              No rentals to show
            </div>
          )
        ) : null}
      </div>
      {/*      
     :null} */}

      <Modal
        isOpen={open}
        onRequestClose={handleClose}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
            onSubmit={addRental}
          >
            <label style={{ marginBottom: "0.5vh" }} for="client">
              Choose a client:
            </label>
            <select style={{ marginBottom: "2vh" }} name="client">
              {clients?.map((client) => (
                <option value={client.fullName}>{client.fullName}</option>
              ))}
            </select>
            <label style={{ marginBottom: "0.5vh" }} for="game">
              Choose a game:
            </label>
            <select style={{ marginBottom: "2vh" }} name="game">
              {games.map((game) => (
                <option value={game.gameName}>{game.gameName}</option>
              ))}
            </select>

            <label style={{ marginBottom: "0.5vh" }} for="months">
              Choose a game:
            </label>
            <select style={{ marginBottom: "2vh" }} name="months">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((elem) => (
                <option value={elem}>{elem}</option>
              ))}
            </select>

            <button className="purpleButton">Ok</button>
          </form>

          <button className="purpleButton" onClick={handleClose}>
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}

export default Rentals;
