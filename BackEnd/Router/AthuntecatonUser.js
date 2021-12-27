const express = require('express');
const router = express.Router();
const AuthController =require('../Controller/authController')

router.use(express.json())

router.post('/singup' , AuthController.singup);

router.post('/login' , AuthController.login);

// router.get('/logout' , AuthController.logout_get);


module.exports = router;