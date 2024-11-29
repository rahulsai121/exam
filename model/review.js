const Sequelize = require('sequelize')
const sequelize = require('../utility/database')

const Review = sequelize.define('review', {
    
    rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
    }    
});

module.exports = Review;
