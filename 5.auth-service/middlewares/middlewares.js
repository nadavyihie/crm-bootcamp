  const morgan = require('morgan');
  const jwt = require('jsonwebtoken');
  const express = require('express');
  const app = express();
  var cors = require('cors')


const jwtVerify=(token,tokenSec)=>{
  try{
    const verified = jwt.verify(token, tokenSec); 
    return verified;
  }
  catch(err){
    return 401;
  }
}
  const loadAllMiddlewares = (app) => {
      
        app.use(express.json());
        app.use(cors());

      /**setup morgan with winston */
      app.use(morgan(':method | :url | :status | :response-time ' ))
        
      //**check token is valid */
      app.use(function (req, res, next) {

          if(req.originalUrl==="users/registered")
          {
            console.log("bla");
            const verified=jwtVerify(req.headers.token, process.env.JWT_KEY);

            if(verified===401){
              res.status(401).json({"message" : "not authenticated!!!"});
            }
           console.log("bla");            
        }
        next();
      });
      /****************** */
  
  };

  module.exports = loadAllMiddlewares;