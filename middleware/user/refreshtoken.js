const {verify} = require("jsonwebtoken");

exports.refreshtoken = async (req,res,next) =>{

    let token = req.get("authorization");
    if (token){

        token = token.slice(7);
        const ver = await verify(token,process.env.SECRET1);

        if (ver){
            req.emailid = ver;
            next();
        }
        else { 
            return res.json({
                    success: 0,
                    message: "Invalid Token"
            })
        }
    }
    else {
        return res.status(403).json({
            success: 0,
            message: "Access Denied! Unauthorized User"         // If Token Entered Wrong  
        })  
    }
}