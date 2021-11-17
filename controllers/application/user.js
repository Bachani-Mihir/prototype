const bcrypt = require("bcryptjs");
const Student = require("../../schema/empschema");
const { sign } = require("jsonwebtoken");
const encrypt = require("../../middleware/user/jwtencdec");
const db = require("../../db/db")
const { pipe } = require("superagent");
require("dotenv").config();

exports.usersignup = async (req, res) => {
    try {
          const password = req.body.password;
          const encpswrd = await bcrypt.hash(password, 10);
          const student = new Student({
            name: req.body.name,
            emailid: req.body.emailid,
            password: encpswrd,
          });
          var std = await student.save();
          res.status(200).json({
            message:"user created successfully",
          });
    } catch (err) {
      console.log(err);
    } 
};

exports.usersignin = async (req, res) => {
    try {
          const emailid = req.body.emailid;
          const password = req.body.password;
          var std = await Student.findOne({ emailid: emailid });
          const cmp = await bcrypt.compare(password, std.password);

          if (cmp) {
            const acctoken = await sign({ emailid: emailid }, process.env.SECRET, {expiresIn: "2h",});
            const reftoken = await sign({ emailid: emailid }, process.env.SECRET1);
            res.json({
              success: 1,
              message: "Login Successfully",
              acctoken: acctoken,
              reftoken: reftoken,
            });
          }else {
            res.status(401).json("Please Enter Correct Password");
          }
    } catch (err) {
      console.log(err);
    }
};

exports.changepassword = async (req, res) => {
    try {
          const email_id = req.emailid;
          const oldpassword = req.body.oldpassword;
          const newpassword = req.body.newpassword;
          const password = await bcrypt.hash(newpassword, 10);
          var std = await Student.findOne({ emailid: email_id });
          const cmp = await bcrypt.compare(oldpassword, std.password);
          
          if (cmp) {
            var std = await Student.findOneAndUpdate(
              { emailid: email_id },
              { password },
              { new: true }
            );
            res.status(200).json({
              message: "Password Changed Successfully",
            });
          }
          else {
            res.status(404).json({
              message:"Entered Wrong Old Password",
            });
          }
    } catch (err) {
      console.log(err);
    }
};

exports.getuser = async(req,res) => {
    try {
          var std = await Student.find();
          res.status(200).json(std);
    }catch (err) {
      console.log(err); 
    }
}

exports.getuserbyname = async(req,res) => {
    try {
          var name = req.params.name;
          var std = await Student.find({name:name});
          
          if(std.length == 0){
            res.sendStatus(404)
          }
          res.status(200).json(std);
    }catch (err) {
      console.log(err);
    }
}

exports.refreshaccesstoken = async (req, res) => {
    try {
          const { emailid } = req.emailid;
          const acctoken = await sign({ emailid: emailid }, process.env.SECRET, {
            expiresIn: "2h",
          });
          return res.json({
            success: 1,
            data: "Access Token Regenerated Successfully",
            acctoken: acctoken,
          });
    } catch (err) {
       console.error(err.message);
    }
};

exports.sorting = async (req,res) => {
    try {
          const data = await Student.aggregate(
            [
              { $sort : { name : 1 } }
            ]
          )
          res.status(200).json(data);
      }catch (err) {
        console.log(err);
      }
}

exports.matchname = async (req,res) => {
    try{
        const data = await Student.aggregate(
          [
            { $match : { name: req.params.name } }
          ]
        )
        res.status(200).json(data);
    }catch (err) {
      console.log(err);
    }
}

exports.count = async (req,res) => {
    try{ 
        const data = await Student.aggregate(
          [
            {$group:{_id:{name: "$name",emailid: "$emailid"}}},
            {count: {$sum : 1}},
          ]
        )
        res.status(200).json({data});
    }catch (err) {
      console.log(err);
    }
}

exports.lookup = async (req,res) => {
    try {
          const data = await Student.aggregate([
            {
              $lookup: {
                from: "students",
                localField: "name",
                foreignField: "name",
                as: "customers_info",
              },
            },
          ])
          res.status(200).json(data);
    }catch (err) {
      console.log(err);
    }
}
