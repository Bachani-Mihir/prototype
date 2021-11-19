const mongoose = require('../db/db');

    const schema = new mongoose.Schema({
        name:{
            type: String,
            required: true
        },
        emailid:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required: true
        },
        
    });
    
const Student = mongoose.model("pedalsup",schema);          // Here Pedalsup Stands For Schema Name Or Collection Name In Database
module.exports = Student;