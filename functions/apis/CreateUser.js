const User = require("../models/UserSchema");

const createUser = async(data) => {
    const user = new User(data);
    await user.save();
    return user;
}

module.exports = createUser;