const express = require('express');
const router = express.Router();

const {signUpUserGet, signInUserGet, signUpUserPost, signInUserPost, logOutGet} = require('../../controllers/user.controller/user.controller');

//Sign up GET
router.get('/user/signup', signUpUserGet);

//Sign up POST
router.post('/user/signup', signUpUserPost);

//Sign in GET
router.get('/user/signin', signInUserGet);

//Sign In POST
router.post('/user/signin', signInUserPost);

//Log Out GET
router.get('/user/logout', logOutGet);



module.exports = router;