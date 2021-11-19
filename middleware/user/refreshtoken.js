const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");
exports.isrefreshtokenAuthenticated = async (req,res,next) =>{
    try{
        let token = req.get("authorization");                                                       // Token requested from headers

        if(token){
            token = token.slice(7);                                                                 // Slice Is Used For Skipping Amount Of data(As Mentioned)
            var decryptedtoken = await CryptoJS.AES.decrypt(token,process.env.key).toString(CryptoJS.enc.Utf8);
            const verification = await jwt.verify(decryptedtoken, process.env.SECRET1);             // Refresh Token verified Using Secret Key
            
            if(verification){
                req.emailid = verification.emailid;                                                 // Emailid Requested From Token       
                next();
            }
            else{ 
                return res.status(401).json({
                        "issuccess": false, 
                        "message": "Invalid Token",                                                 // If Token Entered Wrong
                        "status": 401,
                        "data": {}
                });
            }

        }
        else{
            return res.status(403).json({
                "issuccess": false,
                "message": "Access Denied! Unauthorized User",                                      // If Token Not passed
                "status": 403,
                "data": {}
            })  
        }
        
    }catch(error){
      console.log(error);
    }
}