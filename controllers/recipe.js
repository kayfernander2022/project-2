const express = require('express') 
const Recipe = require('../models/recipe')

const router = express.Router()

// Authorization Middleware
router.use((req, res, next) => {
  const path = req.path;
  if (req.session.loggedIn || path === '/viewall') {
    next();
  } else {
    res.redirect("/user/login");
  }
});


//Routes
//Gets //Index
router.get("/viewall",(req,res) => {
  Recipe.find({}, (err, recipes) => {
  res.render("./recipes/index.ejs",{recipes: recipes, userId: undefined})
});
});

//New
router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs");
});

router.get("/:userId",(req,res) => {
  const userId = req.params.userId;

  Recipe.find({}, (err, recipes) => {
  res.render("./recipes/index.ejs",{recipes: recipes, userId: userId})
});
});

//Show
router.get('/show/:id', (req, res) => {

  Recipe.findById(req.params.id, (err, recipe) => {

    res.render('./recipes/show.ejs', { recipe: recipe });//giving the show one recipe
  })
  
  });

//Edit
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  console.log(id);
  Recipe.findById(id, (err, recipe) => {

    if(recipe)
    {
      res.render("./recipes/edit.ejs", {recipe})
    }
    else
    {
      //redirect to error page for not finding recipe
    }
  })
})

//Delete
router.delete("/:id", (req, res) => {
  const id = req.params.id
  const userId = 123;//test
  Recipe.findByIdAndDelete(id, (err, recipe) => {
    res.redirect(`/recipes/${userId}`)
})
})

//Update
//updates the recipe with information from the form
router.put("/:id", (req, res) => {
  // get the id from params
  const id = req.params.id
  console.log("updateId: " + id);
  console.log("updates " + req.body.name);

  Recipe.findByIdAndUpdate(id, req.body, {new: true}, (err, recipe) => {
    console.log(recipe)
    //
    //send the "new" updated recipe. We will get the old one if we miss this line.
      // redirect user back to main page with recipe
      //res.redirect("/recipes")
      //OR
      //see the updateds to the recipe on its own page
      //res.redirect(`/recipes/show/${req.params.id}`)
  })
  
})


//Create
router.post("/", (req, res) => {
  Recipe.create(req.body,(err,recipe) =>{
  res.redirect("./recipes/index.ejs")
    });
  });

//EDIT 
// shows the actual form



module.exports = router