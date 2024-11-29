const Sequelize = require('sequelize')
const sequelize = require('../utility/database')

const Comment = sequelize.define('comment', {
    
    comment: {
        type: Sequelize.TEXT,
        allowNull: false,
    }
});

module.exports = Comment;
