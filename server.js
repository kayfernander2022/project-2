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

//create express app
const app = express()


//register middleware
app.use(morgan("dev"))//why?? app.use(morgan("tiny"))
app.use(methodOverride("_method"))
app.use("/static",express.static("public"))// /static is needed here to show path. 
app.use(express.urlencoded({extended: true})) 

//Routes and Routers
app.get("/",(req,res) => {
  //res.send("<h1>Hey! Server is Working</h1>")
  res.render("index.ejs")
})

//start server
const PORT =process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))