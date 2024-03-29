const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const cardSchema = new mongoose.Schema({
  cardId: { type: String, required: true, unique: true },
  cardAttribute: { type: String, required: true },
  cardLevel: { type: String, required: true},
  cardType: { type: String, required: true},
  imageData: { type: String, required: true }, 
});


const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  cards: [cardSchema]
});

//before saving to the database, we are hashing the password to ensure security
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 8);
});

//compare the password entered by the user with the hashed password in the database when logging in
userSchema.methods.comparePassword = async function(candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;