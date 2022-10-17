const express = require('express');
const { register,loginUser,logoutUser,getUserDetails }  = require('../controller/userC')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();






// router.route('/register').post(register);
router.route('/signup').post(register);
router.route('/login').post(loginUser);
router.route('/me').get(isAuthenticatedUser,getUserDetails);
router.route('/logout').get(logoutUser);
module.exports = router