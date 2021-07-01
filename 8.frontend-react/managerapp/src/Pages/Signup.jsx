import React, { useState } from 'react';
import './css/signup-style.css'
import LoginBox from '../Components/LoginBox';
import RegisterBox from '../Components/RegisterBox';
import Button from '../Components/Button';
import ChoiceContainer from '../Components/ChoiceContainer';
import Message from '../Components/message';
import AuthForm from '../Components/AuthForm';

function Signup(props) {

    const [isLogin, setIsLogin] = useState(true);
    const [registerMsg,setRegisterMsg]=useState('');
    const [messageColor,setMsgColor]=useState('');
    const isRegularUser = props.userType == 'user';

    const showLoginBox=()=>{
        setIsLogin(true);
    }

    const showRegisterBox=()=>{
        setIsLogin(false);
    }

    const showMsg=(msg)=>{
       setRegisterMsg(msg);
    }

    const changeMsgColor=(color)=>{
        setMsgColor(color)
    }

    const RegisterOne = () => (<div className="signup">
                        {registerMsg?<Message  msgContent={registerMsg} msgColor={messageColor}/>:null}
                    <div className="mainContainer">
                    <AuthForm form action='register' userType={props.userType} msgColor={changeMsgColor} regMsg={showMsg}/>
                    </div>
                    </div>);


    const RegisterTwo = ()=> (
                    <div className="signup">
                    {registerMsg?<Message  msgContent={registerMsg} msgColor={messageColor}/>:null}
                <div className="mainContainer">
                <ChoiceContainer showLogBox={showLoginBox} showRegBox={showRegisterBox}/>
                {/* {isLogin ? <LoginBox/>: <RegisterBox msgColor={changeMsgColor} regMsg={showMsg}/>} */}
                {isLogin ? <AuthForm formAction='login' msgColor={changeMsgColor} regMsg={showMsg} />: <AuthForm formAction='register' msgColor={changeMsgColor} regMsg={showMsg}/>}
                    </div>
                </div>
    );

    
    return (


         (isRegularUser) ? RegisterOne() : RegisterTwo()

     )
}

export default Signup;