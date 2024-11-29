const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');

const authentication=require('../middleware/jwtAuthentication')

router.post('/signup',userController.userPost)
router.post('/login',userController.userLogin)

router.get('/profile',authentication,userController.userGet)

router.put('/updateUser',authentication,userController.userUpdate)

module.exports=router;