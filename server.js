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

//Home
app.get("/",(req,res) => {
  //res.send("<h1>Hey! Server is Working</h1>")
  res.render("index.ejs")//landing ejs file
})

//New
app.get("/recipes/new", (req, res) => {
  res.render("./recipes/new.ejs");
});

//User
app.get("/user/login",(req,res) => {
  //res.send("<h1>Hey! Server is Working</h1>")
  res.render("./user/login.ejs")//landing ejs file
})

app.get("/user/signup",(req,res) => {
  //res.send("<h1>Hey! Server is Working</h1>")
  res.render("./user/signup.ejs")//landing ejs file
})

//Index
app.get("/recipes/:userId",(req,res) => {
  recipe.find({}, (err, recipe) => {
  res.render("./recipes/index.ejs",{recipe})
});
});

app.get("/recipes/viewall",(req,res) => {
  recipe.find({}, (err, recipe) => {
  res.render("./recipes/index.ejs",{recipe})
});
});

//show
app.get('/recipes/:id/show', (req, res) => {
  res.render('./recipes/show.ejs', { recipe: recipe[req.params.id], index: req.params.id });//giving the show one poke
  });

app.post("/user/login", (req, res) => {
    //need to add logic to check if user exist in mongo. 
    // if they do redict to the users recipe/index
    // if they do not show error and request user to signup ????
  });

  app.post("/user/signup", (req, res) => {
    //check if user exist in mongo 
    //if they do not create user in mongo
    //if they do show user already exist
    //redirect to login page
  });

app.post("/recipes", (req, res) => {
  recipe.create(req.body,(err,fruit) =>{
  res.redirect("./recipes/index.ejs")
    });
  });

//Recipes
//Delete 
app.delete("/recipes/:id", (req, res) => {
  const id = req.params.id
  recipe.findByIdAndDelete(id, (err, recipe) => {
      
    res.redirect("./recipes/index.ejs")
})
})

//Create
app.post("/recipes", (req, res) => {
recipe.create(req.body,(err,fruit) =>{
res.redirect("./recipes/index.ejs")
  });
});

//EDIT 
app.get("/recipes/:id/edit", (req, res) => {
  const id = req.params.id
  
  recipe.findById(id, (err, recipe) => {
    console.log(err);
      
      res.render("./recipes/edit.ejs", {recipe})
  })
})

//start server
const PORT =process.env.PORT || 3000
app.listen(PORT, () => console.log(`Listening on port ${PORT}`))