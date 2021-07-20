import axios from "axios";
import React, { useEffect, useState } from "react";
import Crud from "../CRUD/CRUD.component";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { updateGame, fetchGames, createGame } from "./scripts/serverRequests";
import Loading from "../Loading/Loading";
import Modal from "react-modal";
import Form from "../Form/Form.component";
import "./css/games-style.css";
import "../../css/button-style.css"



function Games(props) {


  const [inputValueStr,setInputValueStr]=useState([]);
  const [open,setOpen]=useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);




  const addGame = async (e) => {
    const gameName = e.target.elements.gameName.value.trim();
    const genre = e.target.elements.genre.value.trim();
    const rating = e.target.elements.rating.value.trim();
    const price = e.target.elements.price.value.trim();
    // const imgURL = e.target.elements.imgURL.value.trim();
    const imgURL = e.target.elements.imgURL.files[0];
    const formData = new FormData();
    if(imgURL){
    
   
    formData.append("image", imgURL, imgURL.name);
  }
    const arr = {
      gameName: gameName,
      genre: genre,
      rating: rating,
      price: price,
      imgURL: imgURL.name?imgURL.name:"",
    }
  
    try {
      await axios.post("http://localhost:991/games/create/", arr);
      if(imgURL)
      await axios.post("http://localhost:991/games/saveimage/", formData);
    } catch (err) {
      throw err;
    }
  };
  const modifyGame =  (e) => {
    const gameName = e.target.elements.gameName.value.trim();
    const genre = e.target.elements.genre.value.trim();
    const rating = e.target.elements.rating.value.trim();
    const price = e.target.elements.price.value.trim();
    const imgURL = e.target.elements.imgURL.files[0];
    const formData = new FormData();
    if(imgURL){
    formData.append("image", imgURL, imgURL.name);
    }
    const arr = {
      id: inputValueStr.id,
      gameName: gameName,
      genre: genre,
      rating: rating,
      price: price,
      imgURL: imgURL?imgURL.name:inputValueStr.imgURL?inputValueStr.imgURL:"",
    }
    if(imgURL)
    axios.post("http://localhost:991/games/saveimage/", formData).then(res=>{

    }).catch(err=>{
      console.log(err);
    })
   
      axios.post("http://localhost:991/games/update/", arr).then(res=>{
        setOpen(false);
        readGames();

      }).catch(err=>{
        console.log(err);
      })
     
 
  };

  const removeGame = async (id) => {
    try {
      const res = await axios.post("http://localhost:991/games/remove/", {
        id: id,
      });

     readGames();
    } catch (err) {
      throw err;
    }
  };

  const readGames =  () => {
    setLoading(true);
    fetchGames().then(res=>{
      for (var element of res.data.games) element.price += "$";
      setGames(res.data.games);
      setTimeout(() => {
        setLoading(false);
      }, 500);
    })
    .catch(err=>{
      console.log(err);
    })
  };


  
  useEffect(() => {
    readGames();
  }, []);

  const columnArr = [
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
      Header: "Genre",
      accessor: "genre", // accessor is the "key" in the data
    },
    {
      Header: "Rating",
      accessor: "rating", // accessor is the "key" in the data
    },
    {
      Header: "Price",
      accessor: "price", // accessor is the "key" in the data
    },
  ];

  const addFormInput = [
    { inputType: "text", inputName: "gameName", inputString: "Game name" },
    { inputType: "text", inputName: "genre", inputString: "Genre" },
    { inputType: "text", inputName: "rating", inputString: "Rating" },
    { inputType: "text", inputName: "price", inputString: "Price" },
    { inputType: "file", inputName: "imgURL", inputString: "Image url" },
  ];

  const gamesViewArr = games.map((game, i) => (
    <div
      tabindex={i}
      key={i}
      className="gameDiv"
      style={{
        backgroundColor: "black",
      }}
    >
      <div
        className="gameImg"
        style={{
          backgroundImage: `url("http://localhost:991/images/${game.imgURL}")`,
        }}
      ></div>{" "}
      <RiDeleteBin5Fill className="actionIcon" onClick={()=>{removeGame(game.id)}}/>
      <MdModeEdit className="actionIcon" onClick={()=>{handleModify(game)}}/>
    </div>
  ));


  const customStyles = {
    content: {
    
      top: "50%",
      zIndex:'auto',
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

  const handleModify = (game) => {
    setOpen(true);
    setInputValueStr(game);
  };

  if (loading) {
    return <Loading />;
  }
  return (
    // { <Crud addFormInput={addFormInput}  confirmAdd={addGame} confirmUpdate={modifyGame} crudType='game' columnArr={columnArr} fetchData={readGames} confirmRemove={removeGame}/> }
    <div className="gamesContainer">
     
      
      {gamesViewArr}
      
      <Modal
        isOpen={open}
        onRequestClose={()=>{setOpen(false)}}
        style={customStyles}
        contentLabel="Example Modal"
      >
 <div className="modifyModal">
            <Form
              formStyle="loginForm"
              inputs={ addFormInput}
              submitAction={modifyGame}
              buttonText="Ok"
              defaultInputs={true}
              inputValueStr={inputValueStr}
            />
            <button className="purpleButton" onClick={()=>{setOpen(false)}}>
              Cancel
            </button>
          </div>

      </Modal>
      
      
      </div>
  );
}

export default Games;
