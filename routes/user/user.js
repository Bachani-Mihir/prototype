const express = require('express');
const router = express.Router();
const accesstoken = require('../../middleware/user/token_validation');
const {isrefreshtokenAuthenticated} = require('../../middleware/user/refreshtoken');
const user = require('../../controllers/application/user'); 

    /** Routes For calling An API */
    router.get('/getuser',user.getuser);
    router.get('/getuser/:name',user.getuserbyname);
    router.post('/usersignup',user.usersignup);
    router.post('/usersignin',user.usersignin);
    router.put('/changepassword',accesstoken.checktoken,user.changepassword);
    router.post('/forgotpassword',user.forgotpassword);
    router.post('/refreshaccesstoken',isrefreshtokenAuthenticated,user.refreshaccesstoken); 
    /** Routes For Aggregate Queries  */
    router.get('/sorting',user.sorting);
    router.get('/match/:name',user.matchname);
    router.get('/count',user.count);
    router.get('/lookup',user.lookup);


module.exports = router; 