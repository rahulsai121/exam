const express = require('express');
const router = express.Router();
const recipeController = require('../controller/recipeController');

const authentication=require('../middleware/jwtAuthentication')

const upload=require('../middleware/upload')

router.post('/createRecipe',authentication,upload.single('image'),recipeController.createRecipe)

router.get('/userRecipe',authentication,recipeController.userRecipe)

router.delete('/:id', authentication, recipeController.deleteRecipe)

router.put('/:id',authentication, upload.single('image'), recipeController.updateRecipe)
//router.get('/:id', authentication, recipeController.)

module.exports=router;