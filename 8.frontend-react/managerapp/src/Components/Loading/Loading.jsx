import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './css/loading-style.css'

function Loading(props) {
    return (


<div className="loading">
        
        <Loader
                  type={props.type?props.type:"ThreeDots"}
                  color={props.color?props.color:"#5C6CCD"}
                  height={100 }
                  width={100}
                  
            
                />
                </div>
            );
}

export default Loading;

