const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
  name: {type: String, required: true},
  description: {type: String, required: true},
  archetype: {type: String, required: true},
  attribute: {type: String, required: true},
  atk: {type: Number, required: true},
  def: {type: Number, required: true},
  level: {type: Number, required: true},
  type: {type: String, required: true},
  imageUrl: {type: String, required: true},
});

const Card = mongoose.model("Card", CardSchema);
module.exports = Card;
