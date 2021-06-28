
    
    let form=document.querySelector('#customDetailsForm');
    let submitButton=document.querySelector('#submitButton')
   
    const validateForm= function(){
        var fullName = document.forms["customDetailsForm"]["fullName"].value;
        var email= document.forms["customDetailsForm"]["email"].value;
        var phoneNumber= document.forms["customDetailsForm"]["phoneNumber"].value;
        var fullNameRegex= /^([a-z]{2,}\s{0,1}){1,}$/i;
        var emailRegex= /^[a-z0-9]{1,}@[a-z0-9]{1,}.[a-z0-9]{1,}$/i
        var phoneRegex= /^[0-9]{10}$/i;
        var result=fullNameRegex.test(fullName);
        var errorMsg="";
        if(result==false)
        {
            errorMsg+="*The name input is invalid,please insert it again.<br><br>";
        
        }
        result=emailRegex.test(email);
        if(result==false)
        {
            errorMsg+="*The email input is invalid,please insert it again.<br><br>";
        }
        result=phoneRegex.test(phoneNumber);
        if(result==false)
        {
            errorMsg+="*The phone number input is invalid,please insert it again.";
        }
        if(errorMsg=="")
        {
            document.getElementById("errorMsg").innerHTML="Submit successfully";
            document.getElementById("errorMsg").style.color ="green"; 
            let inputValid=false;
            axios.post('http://localhost:8004',{fullName,email,phoneNumber})
            .then(function (response) {
                inputValid=response.data
                console.log(response.data);
            })
            .catch(function (error) {
              console.log(error);
            });

            
        }
        
        else{
            document.getElementById("errorMsg").style.color ="red"; 
            document.getElementById("errorMsg").innerHTML=errorMsg;
        
        
        }
        
          
    }