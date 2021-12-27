import axios from "axios";

const fetchGames=async ()=>{
    

 
    try {
        const res=  await axios.post("http://localhost:991/games/readall/");

        return res;
     } catch (err) {
        throw err;
     }

}



const createGame=async(gameName,genre,rating,price,imgURL)=>{
   const arr={gameName:gameName,genre:genre,rating:rating,price:price,imgURL:imgURL};

       const res=await axios.post("http://localhost:991/clients/create/",arr);
       console.log(res.headers);
       return res

   

}


const updateGame=async(gameName,genre,rating,price,imgURL)=>{
   const arr={gameName:gameName,genre:genre,rating:rating,imgURL:imgURL};

       const res=await axios.post("http://localhost:991/games/update/",arr);
       alert("update");
       return res

   

}
export  {updateGame,createGame,fetchGames};