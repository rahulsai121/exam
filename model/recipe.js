const Sequelize = require('sequelize')
const sequelize = require('../utility/database')

const Recipe = sequelize.define('recipe', {
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    ingredients: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    instructions: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    cookingTime: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    servings: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    imageUrl: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    averageRating: {
        type: Sequelize.FLOAT,
        allowNull: true,
    }
});

module.exports = Recipe;
