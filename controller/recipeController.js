const Recipe = require('../model/recipe')
const User=require('../model/user')
const Review=require('../model/review')
const Comment=require('../model/comment')

exports.createRecipe = async (req, res) => {
    try {
        const userId = req.userId
        const { title, ingredients, instructions, cookingTime, servings } = req.body
        const newRecipe = await Recipe.create({

            title: title,
            ingredients: ingredients,
            instructions: instructions,
            cookingTime: cookingTime,
            servings: servings,
            imageUrl: req.file.location,
            userId: userId
        })
        res.status(201).json({ message: 'success', recipe: newRecipe.dataValues })
    }
    catch (error) {
        console.log('error in createRecipe', error)
        res.status(400).json({ error: error.message });
    }
}
exports.userRecipe = async (req, res) => {
    try {
        const userRecipe = await Recipe.findAll({
            where: {
                userId: req.userId
            }
        })
        res.status(200).json({ message: 'success', userRecipe })


    } catch (error) {
        console.log('error in userRecipe', error)
        res.status(400).json({ error: error.message });
    }
}
exports.deleteRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({
            where: {
                id: req.params.id
            }
        })

        if (!recipe || recipe.userId !== req.userId) {
            return res.status(404).json({ error: 'Recipe not found or unauthorized' });
        }

        await recipe.destroy();
        res.status(200).json({ message: 'Recipe deleted successfully' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}
exports.updateRecipe = async (req, res) => {
    try {
        const recipe = await Recipe.findOne({
            where: {
                id: req.params.id
            }
        });


        if (!recipe || recipe.userId != req.userId) {
            return res.status(404).json({ error: 'Recipe not found or unauthorized' });
        }
        

        const { title, ingredients, instructions, cookingTime, servings } = req.body;


        const updatedRecipe=await Recipe.update({
            title: title,
            ingredients: ingredients,
            instructions: instructions,
            cookingTime: cookingTime,
            servings: servings,
            imageUrl: req.file.location,
        },

        {
            where: {
                id:req.params.id
            }
        }
    )
    res.status(200).json({ message: 'Recipe updated' })

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

exports.getAllRecipes = async (req, res) => {
    try {
      const { search } = req.query;
      let where = {};
  
      if (search) {
        where = {
          [Op.or]: [
            { title: { [Op.iLike]: `%${search}%` } },
            { ingredients: { [Op.iLike]: `%${search}%` } },
          ],
        };
      }
  
      const recipes = await Recipe.findAll({
        where,
      });
  
      res.status(200).json(recipes);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };