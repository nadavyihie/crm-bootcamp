  const morgan = require('morgan');
  const jwt = require('jsonwebtoken');
  const express = require('express');
  const app = express();
  var cors = require('cors')

  const loadAllMiddlewares = (app) => {
      
        app.use(express.json());
        app.use(cors());

      /**setup morgan with winston */
  
      morgan.token('serviceName', (req, res) => res['locals'].serviceName);
      morgan.token('message', (req, res) => res.locals.errorMessage || '');
  
      app.use(morgan(':serviceName | :method | :url | :status | :response-time :message' ))
        
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



      // error handler
      app.use(function(err, req, res, next) {
  
          //TBD : refactor message format
          // set locals, only providing error in development
          res.locals.message = err.message;
          res.locals.error = req.app.get('env') === 'development' ? err : {};
      
          // add this line to include winston logging
          (res.statusCode >= 400)?
              console.log(`${err.status || 500} - ${err.message.trim()} - ${req.originalUrl} - ${req.method} - ${req.ip}`)
              :
              console.error(`${err.status || 500} - ${err.message.trim()} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
  
          // render the error page
          res.status(err.status || 500);
          res.render('error');
    });
  
  
  };

  module.exports = loadAllMiddlewares;