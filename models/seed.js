//npm run seed

require('dotenv').config()
const mongoose = require('./connection');
const Recipe = require('./recipe') 


mongoose.connection.on("open", () => { //if open and connect to db run this function

  const starterRecipes = [
    { name: "pie", ingredients: "salt", directions: "add 1/2 cup of water", notes:"This was fun!"},
    { name: "Rasta Pasta", ingredients: "pasta", directions: "add 1/2 cup of water", notes:"This was fun!"},
    
    
  ]
  
  Recipe.deleteMany({}, (err, data) => { 
    
    Recipe.create(starterRecipes,(err, data) => {
        
        console.log(data);//should see recipes as json
        //res.json(data)
      });
  });
  });

//close connection