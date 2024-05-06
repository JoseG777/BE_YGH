const functions = require("firebase-functions");

// Set up Express server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// const corsHandler = cors({origin: true});

// Connect to MongoDB
const connectMongo = require("./apis/MongoConnect");
connectMongo();

// Import functions
const createUser = require("./apis/CreateUser");
const findEmail = require("./apis/FindEmail");
const saveImage = require("./apis/SaveImage");

// Set up routes
app.post("/createUser", async (req, res) => {
  const data = req.body;
  const user = await createUser(data);
  res.json(user);
});

app.get("/findEmail", async (req, res) => {
  const username = req.query.username;
  const user = await findEmail(username);
  res.json(user);
});

app.post("/saveImage", async (req, res) => {
  const data = req.body;
  const imageUrl = await saveImage(data);
  res.json(imageUrl);
});


exports.api = functions.https.onRequest(app);
