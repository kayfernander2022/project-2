const mongoose = require('./connection')
const {Schema, model } = mongoose;

const allergenSchema = new Schema({
  name: String,
  allergens: String
});


const Allergen = model("Allergen", allergenSchema);
module.exports = Allergen