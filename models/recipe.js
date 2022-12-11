const mongoose = require('./connection')


const {Schema, model } = mongoose;

const recipeSchema = new Schema({
  name: String,
  img: String,
  ingredients: [
    {type: Schema.Types.String}
  ],
  directions: [
    {type: Schema.Types.String}
  ],
  notes: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

const Recipe = model("Recipe", recipeSchema);


module.exports = Recipe 

