  const morgan = require('morgan');
  const express = require('express');
  const app = express();
  var cors = require('cors')


  const loadAllMiddlewares = (app) => {
      
        app.use(express.json());
        app.use(cors());

      /**setup morgan with winston */
      app.use(morgan(':method | :url | :status | :response-time ' ))
        
      //**check token is valid */
      // app.use(function (req, res, next) {
       
        
      //   next();
      // });
      /****************** */
  
  };

  module.exports = loadAllMiddlewares;