const bcrypt = require("bcryptjs");
const Student = require("../../schema/empschema");
const { sign } = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
require("dotenv").config();

exports.usersignup = async(req, res) => {
    try{
        const password = req.body.password;
        const encpswrd = await bcrypt.hash(password, 10);
        const emailid = req.body.emailid;
        const student = new Student({
              name: req.body.name,
              emailid: req.body.emailid,
              password: encpswrd,
        });

        var findemail = await Student.findOne({ emailid:emailid });
        
        if(findemail){
          res.status(402).json({message:"Multiple Users Cannot Be Created Using Same EmailId"});
        }
        else{
          var studentdata = await student.save(); // Query To Save The Data
          res.status(200).json({
            message:"user created successfully",
            data:studentdata
          });
        }

    }catch(err){
      console.log(err);
    } 
};

exports.usersignin = async(req, res) => {
    try{
        const emailid = req.body.emailid;
        const password = req.body.password;

        var std = await Student.findOne({ emailid: emailid });         //Query To Find Specific Student Using EmailId 
        const verify = await bcrypt.compare(password,std.password);    //Verification Of Saved Password And User Entered Password 

        if(verify){
            const acctoken = await sign({ emailid: emailid }, process.env.SECRET, {expiresIn: "2h",});    //AccessToken Is Generated(ExpiresIn:2 hours)
            const reftoken = await sign({ emailid: emailid }, process.env.SECRET1,{expiresIn: "2d"});     //RefreshToken Is Generated(ExpiresIn:2 days)

            var encacctoken = await CryptoJS.AES.encrypt(acctoken,process.env.key).toString();     //Access Token Encrpyted Using CryptoJS Method
            res.json({
                success: 1,
                message: "Login Successfully",
                acctoken: encacctoken,
                reftoken: reftoken,
            });
        }else{
            res.status(401).json("Please Enter Correct Password");
        }

    }catch(err){
      console.log(err);
    }
};

exports.changepassword = async(req, res) => {
    try{
        const email_id = req.emailid;
        const oldpassword = req.body.oldpassword;
        const newpassword = req.body.newpassword;
        const password = await bcrypt.hash(newpassword, 10);            //Password Encrypted Using bcrypt Method

        var studentdata = await Student.findOne({ emailid: email_id });            //Query To Find Specific Student Using EmailId 
        const verify = await bcrypt.compare(oldpassword, studentdata.password);    //Verification Of Old Password(Saved Password) And User Entered Password 
        
        if(verify){
            var studentdata = await Student.findOneAndUpdate({ emailid: email_id },{ password },{ new: true });   //Query To Find Specific Student Using EmailId And Will Update New Password
            res.status(200).json({
              message: "Password Changed Successfully",
            });
        }
        else{
            res.status(404).json({
              message:"Entered Wrong Old Password",
            });
        }

    }catch(err){
      console.log(err);
    }
};

exports.getuser = async(req,res) => {
    try{
        var studentdata = await Student.find();     //Query To Find All The Data From Database
        res.status(200).json(studentdata);
    }catch(error){
      console.log(error); 
    }
}

exports.getuserbyname = async(req,res) => {
    try{
        var name = req.params.name;                           //Name requested From The Params(Parameters Passed In URL)
        var studentdata = await Student.find({name:name});    //Query To Find Specific User Using Name
          
        if(std.length == 0){
            res.sendStatus(404)
        }

        res.status(200).json(studentdata);
    }catch(error){
      console.log(error);
    }
}

exports.refreshaccesstoken = async(req, res) => {
    try{
        const {emailid} = req.emailid;                                                                 //EmailId Requested  
        const acctoken = await sign({ emailid: emailid }, process.env.SECRET, { expiresIn: "2h" });    //Access Token Regenerated
        return res.json({
            success: 1,
            data: "Access Token Regenerated Successfully",
            acctoken: acctoken,
        });
    }catch(err){
      console.error(err.message);
    }
};
                                      /** AGGREGATE QUERIES */

exports.sorting = async(req,res) => {
    try{
        const data = await Student.aggregate(
          [
            { $sort : { name : 1 } }
          ]
        )
        res.status(200).json(data);
    }catch(err){
      console.log(err);
    }
}

exports.matchname = async(req,res) => {
    try{
        const data = await Student.aggregate(
          [
            { $match : { name: req.params.name } }
          ]
        )
        res.status(200).json(data);
    }catch(err){
      console.log(err);
    }
}

exports.count = async(req,res) => {
    try{ 
        const data = await Student.aggregate(
          [
            {$group:{_id:{name: "$name",emailid: "$emailid"}}},
            {count: {$sum : 1}},
          ]
        )
        res.status(200).json({data});
    }catch(err){
      console.log(err);
    }
}

exports.lookup = async (req,res) => {
    try{
        const data = await Student.aggregate(
          [
            { $lookup:{
                from: "students",
                localField: "name",
                foreignField: "name",
                as: "customers_info",
              },
            },
          ]
        )
          res.status(200).json(data);
    }catch(error){
      console.log(error);
    }
}
