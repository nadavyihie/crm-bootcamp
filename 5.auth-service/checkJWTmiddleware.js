const express = require('express');

const JwtMiddleware = (req,res,next) =>{
    let tokenValidate=false;
    
    console.log(req.originalUrl);

    try {
      const verified = jwt.verify(req.headers.token, toksec);
      tokenValidate=true;
      const data={tokenValidate};
      console.log("bla");
      res.send(data);
      next();
    }
    catch(err) {
     tokenValidate=false;
     res.status(401).json({"message" : "not authenticated!!!"});
    }
  
}


module.exports = { JwtMiddleware }
