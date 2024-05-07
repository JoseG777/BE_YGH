const User = require("../models/UserSchema");

const getCards = async (uid) => {
    const user = await User.findOne({uid: uid});
    return user.cards;
};

module.exports = getCards;