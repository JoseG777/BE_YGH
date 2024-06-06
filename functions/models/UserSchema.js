const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    index: true,
    match: /.+@.+\..+/,
  },
  cards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  }],
  favoriteCards: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Card",
  }],
}, {timestamps: true});

const User = mongoose.model("User", UserSchema);
module.exports = User;
