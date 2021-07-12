import axios from "axios";

const  fetchClients =  async(id) => {
 
    try {
        const res=  await axios.post("http://localhost:991/clients/readAccountClients/",{id:id});
    //   console.log(res)
        return res;
     } catch (err) {
        throw err;
     }
}

const removeClient=async (id)=>{
    try{
        const res=await axios.post("http://localhost:991/clients/remove/",{id:id});
        return res
    }
    catch(err){
        throw err;
    }
    
}
const updateClient=async (id,email,fullName,phoneNumber,address)=>{
    
    const arr={id:id,email:email,fullName:fullName,phoneNumber:phoneNumber,address:address};
    try{
        const res=await axios.post("http://localhost:991/clients/update/",arr);
        return res
    }
    catch(err){
  
        throw err;
    }
    
}

const addClient=async(accountID,email,fullName,phoneNumber,address)=>{
    const arr={accountID:accountID,email:email,fullName:fullName,phoneNumber:phoneNumber,address:address};

        const res=await axios.post("http://localhost:991/clients/create/",arr);
        console.log(res.headers);
        return res

    

}

export { updateClient,fetchClients ,removeClient,addClient};
