//import
require("dotenv").config() // Load ENV Variables
const express = require("express") // import express
const morgan = require("morgan") //import morgan
const methodOverride = require("method-override")
const mongoose = require("mongoose")
const users = require('./models/user')
const allergen = require('./models/allergen')
const recipe = require('./models/recipe')
const recipeAllergen = require('./models/recipeAllergens')
const UserRouter = require("./controllers/user")
const RecipeRouter = require('./controllers/recipe')
const session = require('express-session');
const MongoStore = require('connect-mongo');
const { response } = require("express")

//create express app
const app = express()


//register middleware
app.use(morgan("dev"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))// /static is needed here to show path. 
app.use(express.urlencoded({extended: true})) 
app.use(session({
  secret: process.env.SECRET,
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL}),
  saveUninitialized: true,
  resave: false,
}))
app.use("/recipes", RecipeRouter)
app.use("/user", UserRouter)



//Routes and Routers

app.get('/dburl', (req, res) => {
  res.send(`My connection string is: ${process.env.DATABASE_URL} and secret is: ${process.env.SECRET}`)
})

//Home
app.get("/",(req,res) => {
  //res.send("<h1>Hey! Server is Working</h1>")
  res.render("index.ejs")//landing ejs file
})



//start server
const PORT =process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))