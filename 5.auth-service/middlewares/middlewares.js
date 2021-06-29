  const morgan = require('morgan');
  const jwt = require('jsonwebtoken');
  const express = require('express');
  const app = express();
  var cors = require('cors')

  const loadAllMiddlewares = (app) => {
      
        app.use(express.json());
        app.use(cors());

      /**setup morgan with winston */
      app.use(morgan(':method | :url | :status | :response-time ' ))
        
      //**check token is valid */
      app.use(function (req, res, next) {
        let tokenValidate=false;
          // console.log(req.originalUrl);
          if((req.originalUrl==="/signup" || req.originalUrl==="/signin") || req.originalUrl==="/forgotpassword" || req.originalUrl==="/validateLink")
          {
            next();
          }
          else{
          try {
            const verified = jwt.verify(req.headers.token, process.env.JWT_KEY);
            req.fullName=verified.fullName;
            // console.log(res.userEmail);
            next();
          }
          catch(err) {
           res.status(401).json({"message" : "not authenticated!!!"});
         
          }
        }
        
      });
      /****************** */
  
  };

  module.exports = loadAllMiddlewares;