import React from 'react';
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import './css/loading-style.css'

function Loading(props) {
    return (
        <div className="loading">
        
<Loader
          type="ThreeDots"
          color="#BD5122"
          height={100 }
          width={100}
    
        />
        </div>
    );
}

export default Loading;