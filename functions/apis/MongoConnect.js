const functions = require("firebase-functions");
const mongoose = require("mongoose");
const mongoURI = functions.config().mongo.uri;

const connectMongoDB = async () => {
  try {
    const conn = await mongoose.connect(mongoURI);
    console.log(`MongoDB Connected`);
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
