import axios from "axios";
import React, { useEffect, useState } from "react";
import Crud from "../CRUD/CRUD.component";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import { updateGame, fetchGames, createGame } from "./scripts/serverRequests";
import Loading from "../Loading/Loading";
import Modal from "react-modal";
import Form from "../Form/Form.component";
import PageUnavailable from "../PageUnavailable/PageUnavailable.component";
import "./css/games-style.css";
import "../../css/button-style.css"
import '../../css/searchbox-style.css';

function Games(props) {
  const [pageUnavailable,setPageUnavailable]=useState(false)
  const [submitMsg,setSubmitMsg]=useState(["",""]);
  const [action,setAction]=useState("");

  const [inputValueStr,setInputValueStr]=useState([]);
  const [open,setOpen]=useState(false);
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);




  const addGame = async (e) => {
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
      setSubmitMsg(["The game was successfully added","#D4EDDA"]);
      readGames();
    } catch (err) {
      setSubmitMsg(["The game could not bee added at this moment. please try again later","#F8D7DA"]);


      throw err;
    }
    setOpen(false);
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
        setSubmitMsg(["The game was successfully modified","#D4EDDA"]);

      }).catch(err=>{
        setSubmitMsg(["The game could not bee modified at this moment. please try again later","#F8D7DA"]);

        console.log(err);
      })
     setOpen(false)
 
  };

  const removeGame = async (id) => {
    try {
      const res = await axios.post("http://localhost:991/games/remove/", {
        id: id,
      });
      
     readGames();
     setSubmitMsg(["The game was successfully removed","#D4EDDA"]);
    } catch (err) {
      setSubmitMsg(["The game could not bee removed at this moment. please try again later","#F8D7DA"]);

      throw err;
    }
  };

  const readGames =  () => {
    
    fetchGames().then(res=>{
      for (var element of res.data.games) element.price += "$";
      setGames(res.data.games);
    
    })
    .catch(err=>{
      console.log(err);
    })
  };



  useEffect(() => {
try{
  setTimeout(() => {
    setLoading(false)
  }, 700);
    readGames();
}
catch(err){
  setPageUnavailable(true);
}
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
  gamesViewArr.unshift( <div onClick={()=>{handleAdd()}}
    
    className="addGame"
    
  >+</div>)

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
    setAction("modify")
    game.price=game.price.replace('$','')
    setOpen(true);
    setInputValueStr(game);
  };
  const handleAdd = () => {
    setAction("add")
    setOpen(true);
   
  };

  if (loading) {
    return <Loading />;
  }
  if(pageUnavailable){
    return(
      <PageUnavailable/>        )
  }

  return (
    // { <Crud addFormInput={addFormInput}  confirmAdd={addGame} confirmUpdate={modifyGame} crudType='game' columnArr={columnArr} fetchData={readGames} confirmRemove={removeGame}/> }
    <div style={{marginLeft:'20vw'}}>
      <div style={{height:'4vh'}}></div>
       <div className="gameMsg" style={{ backgroundColor: submitMsg[1] }}>{submitMsg[0]}</div>
    <div className="gamesContainer">
      
      {gamesViewArr}
      
      <Modal
        isOpen={open}
        onRequestClose={()=>{setOpen(false)}}
        style={customStyles}
        contentLabel="Example Modal"
      >
 <div className="modifyModal">
   {action=='modify'?
   
   
   <Form
   formStyle="loginForm"
   inputs={ addFormInput}
   submitAction={modifyGame}
   buttonText="Ok"
   defaultInputs={true}
   inputValueStr={inputValueStr}
 />
   
   
   
   :
   <Form
   formStyle="loginForm"
   inputs={ addFormInput}
   submitAction={addGame}
   buttonText="Ok"
   
 />
   
   
   }
     
            <button className="purpleButton" onClick={()=>{setOpen(false)}}>
              Cancel
            </button>
          </div>

      </Modal>
      
      
      </div>
      </div>
  );
}

export default Games;
