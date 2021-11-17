const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/pedalsup",(error) => {
        if (error){
            console.log(error);
        }
        else {
            console.log("Connected To Database")
        }
})
module.exports = mongoose;