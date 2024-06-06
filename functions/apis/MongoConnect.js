const functions = require("firebase-functions");
const mongoose = require("mongoose");
const mongoURI = functions.config().mongo.uri;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Successfully connected to MongoDB");
  } catch (err) {
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
