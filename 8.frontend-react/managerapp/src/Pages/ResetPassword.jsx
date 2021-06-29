import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import Input from '../Components/Input';
import axios from 'axios';
function ResetPassword(props) {
  
    const {token}=useParams();
    const [userName,setUserName]=useState("");
    const [validToken,setValidToken]=useState(false);
    const [loading,setLoading]=useState(true);
    const saveNewPassword=(e)=>
    {
        e.preventDefault();
        const password=e.target.elements.password.value.trim();
        console.log(password);
        console.log(userName);
        axios.post('http://localhost:8005/users/resetpassword',{userName,password})
        .then(function (response) {
            
           alert(response.data.message);
         

            
        })
        .catch(function (error) {
          alert(error.response.data.message);          
        });

    }
    useEffect(()=>{
        console.log(token);
        axios.get('http://localhost:8005/users/validateLink', {
          headers: {
            'token': token
    
          }
        })
        .then(function (response) {
            
          
         
            setUserName(response.data.userName);
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