const express = require('express') 
const Recipe = require('../models/recipe')

const router = express.Router()

// Authorization Middleware
router.use((req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/user/login");
  }
});



//Index
router.get("/:userId",(req,res) => {
  Recipe.find({}, (err, recipe) => {
  res.render("./recipes/index.ejs",{recipe})
});
});

//New
router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs");
});


//Delete 
router.delete("/recipes/:id", (req, res) => {
  const id = req.params.id
  Recipe.findByIdAndDelete(id, (err, recipe) => {
      
    res.redirect("./recipes/index.ejs")
})
})

//update (missing)
//UPDATE ROUTE
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  
  Recipe.findByIdAndUpdate(id, req.body, {new: true}, (err, recipe) => {//
    //send the "new" updated recipe. We will get the old one if we miss this line.
      // redirect user back to main page with recipe
      //res.redirect("/recipes")
      //OR
      //see the updateds to the recipe on its own page
      res.redirect(`/recipes/${req.params.id}`)
  })
})


//Create
router.post("/recipe", (req, res) => {
  Recipe.create(req.body,(err,recipe) =>{
  res.redirect("./recipes/index.ejs")
    });
  });

//EDIT 
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  
  Recipe.findById(id, (err, recipe) => {
    console.log(err);
      
      res.render("./recipes/edit.ejs", {recipe})
  })
})

//Show
router.get('/:id/show', (req, res) => {
  res.render('./recipes/show.ejs', { recipe: recipe[req.params.id], index: req.params.id });//giving the show one recipe
  });


module.exports = router