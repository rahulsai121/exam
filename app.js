const express = require('express')
const cors = require('cors')


const User=require('./model/user')
const Recipe=require('./model/recipe')
const Review=require('./model/review')
const Comment=require('./model/comment')

const sequelize=require('./utility/database')


const userRoutes=require('./routes/user')
const recipeRoutes=require('./routes/recipe')

require('dotenv').config()


const app=express()
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use('/user',userRoutes)
app.use('/recipe',recipeRoutes)


User.hasMany(Recipe)
Recipe.belongsTo(User)

User.hasMany(Review)
Review.belongsTo(User)

Recipe.hasMany(Review)
Review.belongsTo(Recipe)

User.hasMany(Comment)
Comment.belongsTo(User)

Recipe.hasMany(Comment)
Comment.belongsTo(Recipe)

const PORT = process.env.PORT || 3000
//
sequelize.sync({force:true})
.then(()=>{
    console.log('Database synced')

    const server = app.listen(PORT, () => {
        console.log('Server is running on this PORT--', PORT);
    })

})
.catch((err)=>console.log('error in sync',err))