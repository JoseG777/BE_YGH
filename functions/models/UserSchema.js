const mongoose = require("mongoose");

const CardSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    archetype: { type: String, required: true }, 
    attribute: { type: String, required: true },
    atk: { type: Number, required: true },
    def: { type: Number, required: true },
    level: { type: Number, required: true },
    type: { type: String, required: true },
    imageUrl: { type: String, required: true }  
});

const UserSchema = new mongoose.Schema({
    uid: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    cards: [CardSchema],
    favoriteCards: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Card'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
