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

const removeClient=async (id)=>{
    try{
        const res=await axios.post("http://localhost:991/clients/remove/",{id:id});
        return res
    }
    catch(err){
        return null;
    }
    
}
const updateClient=async (id,email,fullName,phoneNumber,address)=>{
    const arr={id:id,email:email,fullName:fullName,phoneNumber:phoneNumber,address:address};
    try{
        const res=await axios.post("http://localhost:991/clients/update/",arr);
        return res
    }
    catch(err){
  
        return null;
    }
    
}


export { updateClient,fetchClients ,removeClient};
