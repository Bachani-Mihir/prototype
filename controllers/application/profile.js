
const Student = require('../../schema/empschema');

exports.getprofile = async (req,res) => {
    try{
         const email_id = req.emailid;                                                  //EmailId Requested From Given Token
         var studentdata = await Student.findOne({emailid:email_id});                   //Query To Find Student Using EmailId

         if(studentdata){
            res.status(200).json({
                "issuccess": true,
                "message": "Student's Data",
                "status": "200",
                "data": {studentdata}});
         }
         else{ 
            res.status(404).json({
                "issuccess": false,
                "message": "Student Not Found",
                "status": "404",
                "data": {}
            })
         }

    }catch(err){
        console.log(err);
    }
}
        
exports.editprofile = async(req,res) =>{
    try{
        const emailid = req.emailid;                                                                //EmailID Requested From given Token 
        var findstudent = await Student.findOne({emailid:emailid});                                 //Query To Find Student Using EmailID

        if(findstudent){
            const name = req.body.name;                                                             //Name Is Requested From Body
            var getstd = await Student.findOneAndUpdate({emailid:emailid},{name:name},{new:true});  //Query To Find Student And Update The Given Data              
            res.status(200).json({
                "issuccess": true,
                "message": "Student's Updated Data",
                "status": "200",
                "data": {getstd}  
            });
        }
        else{
            res.status(404).json({
                "issuccess": false,
                "message": "Student Not Found",
                "status": "404",
                "data": {}
            })
        }

    }catch(error){
        console.log(error);
    }
}

exports.deleteprofile = async(req,res) => {
    try{       
        const emailid = req.emailid;                                                                    //EmailID Requested From given Token
        var delstudent = await Student.findOneAndDelete({emailid:emailid});                             //Query To Find Student And Delete The Student From Database
        
        if(delstudent){
            res.status(200).json({
                "issuccess": true,
                "message": "User Deleted Successfully",
                "status": "200",
                "data": {
                    flag : true
                }
            })
        }
        else{
            res.status(401).json({
                "issuccess": false,
                "message": "Student Not Found",
                "status": "401",
                "data": {}
            })
        }

    }catch(error){
        console.log(error);
    }
}