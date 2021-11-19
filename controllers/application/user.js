const bcrypt = require("bcryptjs");
const Student = require("../../schema/empschema");
const { sign } = require("jsonwebtoken");
var CryptoJS = require("crypto-js");
require("dotenv").config();
   
exports.usersignup = async(req, res) => {
    try{
        const password = req.body.password;
        const encpswrd = await bcrypt.hash(password, 10);

        const student = new Student({                                      // Query To Create New Student
              name: req.body.name,
              emailid: req.body.emailid,
              password: encpswrd,
        });
        const emailid = req.body.emailid;
        var findemail = await Student.findOne({ emailid:emailid });        // Query To Find The User Using EmailID
        
        if(findemail){
          res.status(402).json({
            "isSuccess": false,  
            "message":"Multiple Users Cannot Be Created Using Same EmailId",
            "status": 402,
            "data": {}
          });
        }
        else{
          var studentdata = await student.save();                           // Query To Save The Data
          res.status(200).json({
            "isSuccess":true,
            "message":"user created successfully",
            "status":200,
            "data": {studentdata}
          });
        }

    }catch(err){
      console.log(err);
    } 
};

exports.usersignin = async(req, res) => {
    try{
        const emailid = req.body.emailid;                                   //EmailId Is Requested From Body
        const password = req.body.password;                                 //Password Is Requested From Body

        var student = await Student.findOne({ emailid: emailid });         //Query To Find Specific Student Using EmailId 
        
        if(student){
          const verify = await bcrypt.compare(password,student.password);    //Verification Of Saved Password And User Entered Password 

          if(verify){
            const acctoken =  sign({ emailid: emailid }, process.env.SECRET, {expiresIn: "2h",});    //AccessToken Is Generated(ExpiresIn:2 hours)
            const reftoken =  sign({ emailid: emailid }, process.env.SECRET1,{expiresIn: "2d"});     //RefreshToken Is Generated(ExpiresIn:2 days)
            var encacctoken = CryptoJS.AES.encrypt(acctoken,process.env.key).toString();     //Access Token Encrpyted Using CryptoJS Method
            var encreftoken = CryptoJS.AES.encrypt(reftoken,process.env.key).toString();     //Refresh Token Encrpyted Using CryptoJS Method
            res.status(200).json({
                "isSuccess": true,
                "message": "Login Successfully",
                "status": 200,
                "data": {
                      emailid: emailid, 
                      acctoken: encacctoken,
                      reftoken: encreftoken  
                },
            });
          }else{
              res.status(401).json({
                  "isSuccess": false,
                  "message": "Please Enter Correct Password",
                  "status": 401,
                  "data": {}
              });
          }

        }else{
          res.status(401).json({
            "isSuccess": false,
            "message": "Student Data Not Found",
            "status": 401,
            "data": {}
          });
        }

    }catch(err){
      console.log(err);
    }
};

exports.changepassword = async(req, res) => {
    try{
        const email_id = req.emailid;                                                // EmailId Requested From Body
        const newpassword = req.body.newpassword;                                    // New Password Requested From Body
        const encpassword = await bcrypt.hash(newpassword, 10);                      // Password Encrypted Using bcrypt Method
        const findstudent = await Student.findOne({ emailid: email_id });            // Query To Find Student Using EmailId
  
        if(findstudent){
            var studentdata = await Student.findOneAndUpdate({ emailid: email_id },{password: encpassword },{ new: true });   // Query To Find Specific Student Using EmailId And Will Update New Password
            res.status(200).json({
              "issuccess": true,
              "message": "Password Changed Successfully",
              "status": 200,
              "data": {studentdata}
            });
        }
        else{
            res.status(404).json({
                "isSuccess": true,
                "message": "No Such Student Found",
                "status": 401,
                "data": {}
            });
        }

    }catch(err){
      console.log(err);
    }
};

exports.refreshaccesstoken = async(req,res) => {
    try{
        var acctoken = await sign({ emailid: req.emailid }, process.env.SECRET, {expiresIn: "2h",});      // Access Token Regenerated Using Secret Key
        var encacctoken = await CryptoJS.AES.encrypt(acctoken,process.env.key).toString();                // Access Token Is Encrypted
        return res.status(200).json({
            "issuccess":true,
            "message": "Access Token Regenerated Successfully",
            "status": 200,
            "data": {
                     "accesstoken": encacctoken,
            },
        })
    }catch(error){
        console.log(error);
    }
}

exports.forgotpassword = async(req,res) => {
    try{
        const emailid = req.body.emailid;                                                   // EmailID Is Requested From Body
        const findedata = await Student.findOne({emailid: emailid});                        // Query To Find Student Using EmailID 
        
        if(findedata){
            sendmail(emailid,findedata.name);
            res.status(200).json({
                "issuccess":true,
                "message": "Email Sent Successfully To The Registered EmailId",
                "status": 200,
                "data": {}
            })
        }else{
          res.status(404).json({
            "issuccess": false,
            "message": "Student Not Found",
            "status": 404,
            "data": {} 
          })
        }

    }
    catch(error){
        console.log(error);
    }
}

const sendmail = async(emailid,studentname) => {                                  // Send Mail Is Used For Sending Mail
    try{
        const token = sign({emailid}, process.env.secret, {expiresIn:'4h'});
        const link = `${token}`;
        console.log(link);
    }catch(error){
      console.log(error);
    }
}

exports.getuser = async(req,res) => {
    try{
        var studentdata = await Student.find();                //Query To Find All The Data From Database

        if(studentdata){
          res.status(200).json({
              "isSuccess": true,
              "message": "Users Data",
              "status": 200,
              "data": {studentdata}
        });

      }
    }catch(error){
      console.log(error); 
    }
}

exports.getuserbyname = async(req,res) => {
    try{
        var name = req.params.name;                           //Name requested From The Params(Parameters Passed In URL)
        var studentdata = await Student.find({name:name});    //Query To Find Specific User Using Name
          
        if(studentdata.length == 0){
          res.sendStatus(404)
        }

        res.status(200).json({
            "issuccess": true,
            "message": " User's data By Name",
            "status": "studentdata",
            "data": {studentdata}
        });
    }catch(error){
      console.log(error);
    }
}

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
