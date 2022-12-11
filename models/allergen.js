const mongoose = require('./connection')
const {Schema, model } = mongoose;

const allergenSchema = new Schema({
  name: String,
  allergens: [
    {type: Schema.Types.String}
  ]
});


const Allergen = model("Allergen", allergenSchema);
module.exports = Allergen