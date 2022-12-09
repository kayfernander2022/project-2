//npm run seed

require('dotenv').config()
const mongoose = require('./connection');
const Recipe = require('./recipe') 


mongoose.connection.on("open", () => { //if open and connect to db run this function

  const starterRecipes = [
    { name: "Apple Pie",img:"https://media.istockphoto.com/id/119689299/photo/foot.jpg?s=612x612&w=0&k=20&c=9JOAymP36fEIznaAM7XXw_EYqZWXa5djEUf3-zqSoZI=", ingredients: "salt", directions: "add 1/2 cup of water", notes:"This was fun!"},
    { name: "Rasta Pasta", img:"https://static01.nyt.com/images/2021/02/11/dining/mp-rasta-pasta/merlin_183521775_ac3a7f41-6c1d-4955-aba2-661a693fb66b-articleLarge.jpg", ingredients: "pasta", directions: "add 1/2 cup of water", notes:"This was fun!"},
    
    
  ]
  
  Recipe.deleteMany({}, (err, data) => { 
    
    Recipe.create(starterRecipes,(err, data) => {
        
        console.log(data);//should see recipes as json
        //res.json(data)
        mongoose.connection.close();
      });
  });
  });

//close connection
