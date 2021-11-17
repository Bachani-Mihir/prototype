const {verify} = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
require("dotenv").config();

exports.checktoken = async(req, res, next) => {
  try{
      let token = req.get("authorization"); // Token readed from headers

      if(token){
          token = token.slice(7);
          var decrypted = CryptoJS.AES.decrypt(token,process.env.key).toString(CryptoJS.enc.Utf8);
          const verify = await verify(decrypted, process.env.SECRET); // Token verified Using Secret Key
          const emailid = req.body.emailid;
          
            if(verify.emailid == emailid)
            { 
              req.emailid = verify.emailid;
              next();
            } 
            else 
            {
              res.status(401).send({
                message: "Entered Incorrect Emailid Or Incorrect Access Token",
              });
            }  

      }else{
          return res.status(403).json({
            message: "Access Denied! Unauthorized User", // If Token Entered Wrong
          });
      }

  }catch(err){
      return res.status(404).json({
          success: 0,
          message: "Invalid Token",
      });
  }
};
