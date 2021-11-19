const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

exports.checktoken = async(req, res, next) => {
  try{
      let token = req.get("authorization");                                                               // Token requested from headers

      if(token){
          token = token.slice(7);                                                                         // Slice Is Used For Skipping Amount Of data(As Mentioned) 
          var decryptedtoken = CryptoJS.AES.decrypt(token,process.env.key).toString(CryptoJS.enc.Utf8);   
          var verification = jwt.verify(decryptedtoken, process.env.SECRET);                              // Access Token verified Using Secret Key

            if(verification)                                                                           
            { 
              req.emailid = verification.emailid;                                                         // Emailid Requested From Token
              next();
            } 
            else 
            {
              res.status(401).send({
                "isSuccess": false,
                "message": "Entered Incorrect Emailid Or Incorrect Access Token",
                "status": 401,
                "data": {}
              });
            }  

      }else{
          return res.status(403).json({
                "isSuccess": false,
                "message": "Access Denied! Unauthorized User",
                "status": 403,
                "data": {}
          });
      }

  }catch(err){
      return res.status(404).json({
                "isSuccess": false,
                "message": "Invalid Token",
                "status": 404,
                "data": {}
      });
  }
};
