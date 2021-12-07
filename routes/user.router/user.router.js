const express = require('express');
const router = express.Router();

const {signUpUserGet, signInUserGet, signUpUserPost} = require('../../controllers/user.controller/user.controller');

//Sign up GET
router.get('/user/signup', signUpUserGet);

//Sign up POST
router.post('/user/signup', signUpUserPost);

//Sign in GET
router.get('/user/signin', signInUserGet);

module.exports = router;