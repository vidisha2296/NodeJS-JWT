const express = require('express');
const { jokes }  = require('../controller/jokes')
const { isAuthenticatedUser} = require('../middleware/auth');
const router = express.Router();


router.route('/random-joke').get(isAuthenticatedUser,jokes);
module.exports = router