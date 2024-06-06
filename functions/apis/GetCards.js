const User = require("../models/UserSchema");

const getCards = async (uid) => {
  try {
    const user = await User.findOne({uid: uid}).populate("cards");
    if (!user) {
      throw new Error("User not found");
    }
    return user.cards;
  } catch (error) {
    console.error("Failed to get cards:", error);
    throw error;
  }
};

module.exports = getCards;
