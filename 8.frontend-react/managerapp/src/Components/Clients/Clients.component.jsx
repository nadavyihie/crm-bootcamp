import React, { useEffect, useState } from 'react';
import axios from 'axios';
function Clients(props) {
    const [open, setOpen] = useState(false);
    const [usersdata,setUsersData]=useState([]);
    useEffect(() => {
      
        console.log(props.userDetails[0].id);
        // alert(props.userDetails.id);
        // console.log(props.userDetails);
        axios
          .get("http://localhost:8005/users/fetchallusers", {
            headers: {
              "managerID": props.userDetails[0].id,
            },
          })
          .then(function (response) {
           
            setUsersData(response.data);
            console.log(usersdata)
            
            // console.log(response.data.allUsers)
          
          })
          .catch(function (error) {
            // console.log(error);
          });
      },[]);
  
  
  
  
    return (
        <div>
       <span>bla</span>
        </div>
    );
}

export default Clients;