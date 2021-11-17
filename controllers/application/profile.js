
const Student = require('../../schema/empschema');

exports.getprofile = async (req,res) => {
    try{
         const email_id = req.body.emailid;
         var std = await Student.findOne({emailid:email_id});

         if(std){
            res.status(200).json(std);
         }
         else{ 
            res.status(404).json({
                success:'0',
                message:"Student Not Found"
            })
         }

    }catch(err){
        console.log(err);
    }
}
        
exports.editprofile = async(req,res) =>{
    try{
        const emailid = req.body.emailid;
        var findstd = await Student.findOne({emailid:emailid});

        if(findstd){
            const name = req.body.name;
            var getstd = await Student.findOneAndUpdate({emailid:emailid},{name:name},{new:true});              
            res.status(200).json(getstd);
        }
        else{
            res.status(404).json({
                success:'0',
                message:"Student Not Found"
            })
        }

    }catch(error){
        console.log(error);
    }
}

exports.deleteprofile = async(req,res) => {
    try{       
        const emailid = req.emailid;
        var delstd = await Student.findOneAndDelete({emailid:emailid});
        
        if(delstd){
            res.status(201).json({
                message:"User Deleted Succesfuuly",
            })
        }
        else{
            res.status(401).json({
                message:"Student Name Not Found",
            })
        }

    }catch(error){
        console.log(error);
    }
}