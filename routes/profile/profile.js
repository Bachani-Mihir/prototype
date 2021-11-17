const express = require('express');
const router = express.Router();
const acctoken = require('../../middleware/user/token_validation');
const userprofile = require('../../controllers/application/profile');
                    
    /** Routes For Calling An API */
    router.post('/getprofile',acctoken.checktoken,userprofile.getprofile);
    router.put('/editprofile',acctoken.checktoken,userprofile.editprofile);
    router.delete('/deleteprofile',acctoken.checktoken,userprofile.deleteprofile);


module.exports = router;