const mongoose = require('./connection')


const {Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: String,
  img: String,
  ingredients: String,
  directions: String,
  notes: String,
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});


const Recipe = model("Recipe", recipeSchema);


module.exports = Recipe 

