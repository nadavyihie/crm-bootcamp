import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../Components/Input';
import axios from 'axios';
function ResetPassword(props) {
  
    const {token,userName}=useParams();
    // console.log(userName);
    const [validToken,setValidToken]=useState(false);
    const [loading,setLoading]=useState(true);
    const saveNewPassword=(e)=>
    {
        e.preventDefault();
        axios.get('http://localhost:8005/users/resetpasswotd', {
          headers: {
            'token': token,
            
          }
        })
        .then(function (response) {
            
            // console.log(response.status);
         
            console.log("blaaaa");
            setValidToken(true);
            
        })
        .catch(function (error) {
          setValidToken(false);
          
        });

    }
    useEffect(()=>{
        console.log(token);
        axios.get('http://localhost:8005/users/validateLink', {
          headers: {
            'token': token,
            'userName': userName
          }
        })
        .then(function (response) {
            
            // console.log(response.status);
         
            console.log("blaaaa");
            setValidToken(true);
            
        })
        .catch(function (error) {
          setValidToken(false);
          
        });
      
    
        setLoading(false);
      
      },[])


      if (loading) {
        return <div >Loading...</div>;
      }
    return (
        <div className="App">
        { validToken?
          <div>
            <form onSubmit={saveNewPassword}>
              <Input  inputType="text" inputName="password" inputString="new password"/>
              <button>send</button>
        </form>
          </div>
        
        :
        <div>
          401 error not foundddddddd  
        </div>}
        </div>
        
        
    );
}

export default ResetPassword;