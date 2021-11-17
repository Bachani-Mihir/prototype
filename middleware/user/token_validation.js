const { verify } = require("jsonwebtoken");
const decrypt = require('../../middleware/user/jwtencdec')
exports.checktoken = async (req, res, next) => {
  try {

    let token = req.get("authorization"); // Token readed from headers

    if (token) {
        token = token.slice(7);
        const ver = await verify(token, process.env.SECRET); // Token verified Using Secret Key
        const emailid = req.body.emailid;
        
          if ((ver.emailid) == (emailid))
          { 
            req.emailid = ver.emailid;
            next();
          } 
          else 
          {
            res.status(401).send({
              message: "Entered Incorrect Emailid Or Incorrect Access Token",
            });
          }  

    } else {
      return res.status(403).json({
        message: "Access Denied! Unauthorized User", // If Token Entered Wrong
      });
    }

  } catch (err) {

      return res.status(404).json({
        success: 0,
        message: "Invalid Token",
      });

  }
};
