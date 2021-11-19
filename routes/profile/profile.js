const express = require('express');
const router = express.Router();
const accesstoken = require('../../middleware/user/token_validation');
const userprofile = require('../../controllers/application/profile');
                    
    /** Profile Routes For Calling An API */
    router.get('/getprofile',accesstoken.checktoken,userprofile.getprofile);
    router.put('/editprofile',accesstoken.checktoken,userprofile.editprofile);
    router.delete('/deleteprofile',accesstoken.checktoken,userprofile.deleteprofile);


module.exports = router;