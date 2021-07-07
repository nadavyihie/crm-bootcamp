import axios from "axios";

const  fetchClients =  async(id) => {
 
    try {
        const res=  await axios.post("http://localhost:991/clients/readAccountClients/",{id:id});
    //   console.log(res)
        return res;
     } catch (err) {
       return null;
     }
}

const axiosPost=async (postURL,postBody)=>{
    let res="";


}



export { fetchClients };
