//npm run seed

require('dotenv').config()
const mongoose = require('./connection');
const Recipe = require('./recipe') 
const Allergen = require('./allergen');
const RecipeAllergen = require('./recipeAllergens');

mongoose.connection.on("open", () => { //if open and connect to db run this function

  const starterRecipes = [
    { name: "Apple Pie",img:"https://media.istockphoto.com/id/119689299/photo/foot.jpg?s=612x612&w=0&k=20&c=9JOAymP36fEIznaAM7XXw_EYqZWXa5djEUf3-zqSoZI=", ingredients: ["salt", "milk", "eggs"], directions: ["add 1/2 cup of water"], notes:"This was fun!", user:'63936d65813d6609a9d0a44b'},
    { name: "Rasta Pasta", img:"https://static01.nyt.com/images/2021/02/11/dining/mp-rasta-pasta/merlin_183521775_ac3a7f41-6c1d-4955-aba2-661a693fb66b-articleLarge.jpg", ingredients: ["pasta", "tomatoes", "cheese"], directions: ["add 1/2 cup of water"], notes:"This was fun!"},
  ]
  
  const allergenSeeds = [
    {name: "milk",
    allergens: ["milk", "cheese", "dairy"]},
    {name: "egg",
    allergens: ["egg", "eggs"]},
    {name:"peanut",
    allergens:["peanut", "peanuts"]
    },
    {name:"soy",
    allergens:["soy", "soybean", "soy bean"]
    },
    {name:"wheat",
    allergens:["wheat"]
    },
    {
      name:"tree nut",
      allergens:["walnut", "almond", "hazelnut", "pecan", "cashew", "pistachio","walnuts", "almonds", "hazelnuts", "pecans", "cashews", "pistachios"]
    },
    {name:"shellfish",
    allergens:["shrimp", "prawns", "crab", "lobster", "clams", "mussels", "oysters", "scallops", "octopus", "squid", "abalone", "snail"]
    },
    {
      name:"fish",
      allergens:["fish", "salmon", "tuna", "catfish", "cod"]
    },
    {
      name:"sesame",
      allergens:["sesame"]
    }
  ];

  RecipeAllergen.deleteMany({}, (err, data) =>{
    
  })

  Recipe.deleteMany({}, (err, data) => { 
    Recipe.create(starterRecipes,(err, data) => {
        console.log(data);//should see recipes as json
      });
  });

  

  Allergen.deleteMany({}, (err, data) => { 
    Allergen.create(allergenSeeds,(err, data) => {
        console.log(data);//should see recipes as json
        //res.json(data)
        mongoose.connection.close();
      });
  });

  
  
  });

 
//close connection
