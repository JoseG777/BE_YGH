const admin = require("firebase-admin");
const serviceAccount = require("../serviceKey.json");
const User = require("../models/UserSchema");
const Card = require("../models/CardSchema");
const axios = require("axios");
const stream = require("stream");
const {promisify} = require("util");
const pipeline = promisify(stream.pipeline);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: "yugioh-saver.appspot.com",
});

const bucket = admin.storage().bucket();

const saveImage = async (data) => {
  const {uid, name, url, description, archetype, attribute, atk, def, level, type} = data;

  const imageName = `${name.replace(/\s+/g, "_")}.jpg`;
  const imagePrefix = `${uid}_cards/${imageName}`;

  const file = bucket.file(imagePrefix);

  try {
    const response = await axios({
      url: url,
      method: "GET",
      responseType: "stream",
    });

    await pipeline(response.data, file.createWriteStream({
      metadata: {
        contentType: "image/jpeg",
      },
    }));

    const [signedUrl] = await file.getSignedUrl({action: "read", expires: "03-01-2500"});

    const newCard = new Card({
      name,
      description,
      archetype,
      attribute,
      atk,
      def,
      level,
      type,
      imageUrl: signedUrl,
    });

    const savedCard = await newCard.save();

    const updatedUser = await User.findOneAndUpdate(
        {uid: uid},
        {$push: {cards: savedCard._id}},
        {new: true},
    );

    if (!updatedUser) {
      console.error("User not found");
      throw new Error("User not found");
    }

    console.log("Card added to user successfully");
    return {imageUrl: signedUrl};
  } catch (error) {
    console.error("Failed to save image or update user:", error);
    throw error;
  }
};

module.exports = saveImage;
