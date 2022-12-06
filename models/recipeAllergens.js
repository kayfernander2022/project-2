const mongoose = require('./connection')
const {Schema, model } = mongoose;

const recipeAllergen = new Schema({
  recipe: {
    type: Schema.Types.ObjectId,
    ref: "Recipe"
  },
  allergen: {
    type: Schema.Types.ObjectId,
    ref: "Allergen"
  },
  doesAllergyExist: Boolean
});

const RecipeAllergen = model("RecipeAllergen", recipeAllergen);

module.exports = RecipeAllergen;