const mongoose = require('./connection')
const {Schema, model } = mongoose;

const recipeAllergen = new Schema({
  recipeId: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  allergenId: {
    type: Schema.Types.ObjectId,
    ref: "Allergen"
  },
  ingredients:[
    {type: Schema.Types.String}
  ],
  doesAllergyExist: Boolean
});

const RecipeAllergen = model("RecipeAllergen", recipeAllergen);

module.exports = RecipeAllergen;