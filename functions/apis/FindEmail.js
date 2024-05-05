const User = require("../models/UserSchema");

const findEmail = async (username) => {
    const user = await User.findOne({ username: username });
    // console.log(user.email);
    return user;
}

module.exports = findEmail;