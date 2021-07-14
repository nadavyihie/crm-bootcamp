
import axios from "axios";
import React from "react";
import Crud from "../CRUD/CRUD.component";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdModeEdit } from "react-icons/md";
import {updateGame,fetchGames,createGame} from './scripts/serverRequests';
function Games(props) {
  
  const addGame=async(e)=>{
    const gameName = e.target.elements.gameName.value.trim();
    const genre = e.target.elements.genre.value.trim();
    const rating = e.target.elements.rating.value.trim();
    const price = e.target.elements.price.value.trim();
    // const imgURL = e.target.elements.imgURL.value.trim();
    const imgURL=e.target.elements.imgURL.files[0];
    const formData = new FormData(); 
     
  
    formData.append( 
      "image", 
     imgURL, 
     imgURL.name
    ); 
   
    const arr={gameName:gameName,genre:genre,
      rating:rating,price:price,imgURL:imgURL.name};
      try{
    await axios.post("http://localhost:991/games/create/",arr);
    await axios.post("http://localhost:991/games/saveimage/",formData);
    
      }
      catch(err){
        throw err;
      }
  }
  const modifyGame=async(e,id)=>{
    const gameName = e.target.elements.gameName.value.trim();
    const genre = e.target.elements.genre.value.trim();
    const rating = e.target.elements.rating.value.trim();
    const price = e.target.elements.price.value.trim();
    const imgURL = e.target.elements.imgURL.value.trim();
    const arr={id:id,gameName:gameName,genre:genre,
      rating:rating,price:price,imgURL:imgURL};
      try{
    const res=await axios.post("http://localhost:991/games/update/",arr);
 
    return res
      }
      catch(err){
        throw err;
      }
   
  }



const removeGame=async(id)=>{
  try{
    const res=await axios.post("http://localhost:991/games/remove/",{id:id});
    
    return res
      }
      catch(err){
        throw err;
      }
}

const readGames= async ()=> {
  let games = "";
    games=await fetchGames();
    for(var element of games.data.games)
    element.price+="$"
    console.log(games.data.games)
    return games;
          
}


  const columnArr = [
    {
      Header: "",
      accessor: "imgURL",
      Cell: ({ row }) => (
        
         
          <div
            className="gameImg"
            style={{ backgroundImage: `url("http://localhost:991/images/${row.original.imgURL}")` }}
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


  const addFormInput=[{inputType: "text", inputName: "gameName", inputString:"Game name"},
  {inputType: "text", inputName: "genre", inputString: "Genre"},
  {inputType: "text", inputName: "rating", inputString: "Rating"},
  {inputType: "text", inputName: "price", inputString: "Price"},
  {inputType: "file", inputName: "imgURL", inputString: "Image url"}];

  return (
    <div>
      <Crud addFormInput={addFormInput}  confirmAdd={addGame} confirmUpdate={modifyGame} crudType='game' columnArr={columnArr} fetchData={readGames} confirmRemove={removeGame}/>
    </div>
  );
}

export default Games;
