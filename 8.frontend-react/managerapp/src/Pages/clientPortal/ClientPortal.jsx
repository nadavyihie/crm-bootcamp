import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './css/clientportal-style.css'
import axios from 'axios';
import Loading from '../../Components/Loading/Loading';
import Form from '../../Components/Form/Form.component';
function ClientPortal(props) {
  

    useEffect(()=>{
    

        axios.get('http://localhost:8005/users/readaccount', {
            headers: {
              'id': accountID
            }
          })
          .then(function (response) {
            setAccountDetails(response.data);
            
            setTimeout(() => {
                setLoading(false);
            }, 2000);
           

           
     
          })
          .catch(function (error) {
      console.log(error);
            
          });
    
      
      },[])

const fetchClientRentals=()=>{

}

      const[accountDetails,setAccountDetails]=useState([]);
    const [accountID,setAccountID]=useState(useParams().accountID);
    const[loading,setLoading]=useState(true)
      const inputs=[{inputType: "text", inputName: "phoneNumber", inputString:"Phone number"},];
  
      if(loading){
          return(
            <div class="preload">
                 <div className="joystick"></div>

              </div>
          );

      }

    return (
        
        <div className="clientPortal">
        <div className="clientTitle">{`${accountDetails[0].companyName} client portal`}</div>
        <div className="submitTitle">Please, enter your phone number:</div>
        <div className="submitContainer">
        
        <Form
              formStyle="loginForm"
              inputs={ inputs}
              submitAction={fetchClientRentals}
              buttonText="Submit"
            />
            </div>
           
        </div>
    );
}

export default ClientPortal;