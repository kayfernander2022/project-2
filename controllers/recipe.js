const express = require('express') 
const Recipe = require('../models/recipe')
const Allergen = require('../models/allergen')
const RecipeAllergen = require('../models/recipeAllergens')
const router = express.Router()
//get all allergen from allergen db
function getAllergens()
{
  return Allergen.find({})
};

async function getRecipeAllergens(recipeId, ingredients){
  const allergens = await getAllergens();
  console.log(allergens);
  const recipeAllergens = [];

  allergens.forEach(allergen => {
    const allergensFound = [];
    ingredients.forEach(ingredient => {
      if(allergen.allergens.indexOf(ingredient.toLowerCase()) >=0)
      {
        allergensFound.push(ingredient);
      }
    })
   
    const allergenItem = {
      recipeId: recipeId,
      allergenId: allergen.id,
      ingredients: allergensFound,
      doesAllergyExist: allergensFound.length > 0
    }

    recipeAllergens.push(allergenItem);
  });

  return recipeAllergens;
}

// Authorization Middleware
router.use((req, res, next) => {
  const path = req.path; //get path to current page
  if (req.session.loggedIn || path.startsWith('/viewall')) { //auth user if login or view page
    next();
  } else {
    res.redirect("/user/login");
  }
});


//Routes
//Gets //Index
router.get("/viewall",(req,res) => {
  const userId = req.session.userId

  Recipe.find({}, (err, recipes) => {
    res.render("./recipes/index.ejs",{
      recipes: recipes, 
      isLoggedIn: req.session.loggedIn,
      userId: userId, 
      path: 'viewall'})
}).populate('user');


});

//New
router.get("/new", (req, res) => {
  res.render("./recipes/new.ejs", {
    userId: req.session.userId});
});

router.get("/:userId",(req,res) => {
  const userId = req.params.userId;

 Recipe.find({'user': userId}, (err, recipes) => {
  res.render("./recipes/index.ejs",{
    recipes: recipes, 
    isLoggedIn: req.session.loggedIn, 
    userId: userId, 
    path:'userview'})
}).populate('user');;
});

//Show
router.get('/show/:id', (req, res) => {
  
  Recipe.findById(req.params.id, (err, recipe) => {
    console.log("recipe id " + recipe.id);
    RecipeAllergen.find({'recipeId': recipe.id}, (err, allergens) => {

      const recipeAllergens = allergens.filter((a => a.doesAllergyExist));
      console.log(recipeAllergens);

      const ingredients = [];

      recipe.ingredients.forEach(ingredient => {
        console.log("Checking allergens for " + ingredient.toLowerCase());

        const isAllergen = recipeAllergens.filter((recipeAllergen => recipeAllergen.ingredients?.indexOf(ingredient.toLowerCase()) >= 0)).length > 0

        ingredients.push({
          name: ingredient,
          isAllergen: isAllergen
        })
      })

      const recipeDetails = {
        id: recipe.id,
        img: recipe.img,
        name: recipe.name,
        ingredients: ingredients,
        directions: recipe.directions,
        notes: recipe.notes
      }
      console.log("recipe details: " + recipeDetails.name);
  
      res.render('./recipes/show.ejs', { recipe: recipeDetails });//giving the show one recipe
    });
  })
  });

//Edit
router.get("/:id/edit", (req, res) => {
  const id = req.params.id
  console.log(id);
  Recipe.findById(id, (err, recipe) => {

    if(recipe)
    {
      res.render("./recipes/edit.ejs", {recipe: recipe, userId: req.session.userId})
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
  const userId = req.session.userId;

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

  Recipe.findByIdAndUpdate(id, req.body, {new: true}, (err, recipe) => {//send the "new" updated recipe. We will get the old one if we miss this line.
    console.log(recipe)

    RecipeAllergen.deleteMany({}, (err, data) => {
      getRecipeAllergens(recipe.id, recipe.ingredients || []).then((recipeAllergens) => {
        console.log(recipeAllergens);
        RecipeAllergen.create(recipeAllergens, (err, newRecipeAllergens) =>{
          console.log(newRecipeAllergens)
        
          
            // redirect user back to main page with recipe
            //res.redirect("/recipes")
            //OR
            //see the updateds to the recipe on its own page
          res.redirect(`/recipes/show/${req.params.id}`)
        })
    })
  })
  })
  
})


//Create
router.post("/", (req, res) => {
  console.log(req.body);
  
  const userId = req.session.userId;
  
  Recipe.create(req.body,(err,recipe) =>{
    const recipeId = recipe.id;
    const ingredients = recipe.ingredients;

    getRecipeAllergens(recipeId, ingredients || []).then((recipeAllergens) => {
      console.log(recipeAllergens);
      RecipeAllergen.create(recipeAllergens, (err, newRecipeAllergens) =>{
        console.log(newRecipeAllergens)

        res.redirect(`/recipes/${userId}`)
      })
    })
  });
  });




module.exports = router