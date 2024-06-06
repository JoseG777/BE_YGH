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
const getCards = require("./apis/GetCards");

// Set up routes
app.post("/createUser", async (req, res) => {
  try {
    const data = req.body;
    const user = await createUser(data);
    res.json(user);
  } catch (error) {
    console.error("Error in /createUser:", error);
    res.status(500).json({ message: error.message });
  }
});


app.get("/findEmail", async (req, res) => {
  const username = req.query.username;
  const user = await findEmail(username);
  res.json(user);
});

app.post("/saveImage", async (req, res) => {
  try {
    const data = req.body;
    const imageUrl = await saveImage(data);
    res.json({imageUrl});
  } catch (error) {
    console.error("Error in /saveImage:", error);
    res.status(500).json({message: error.message});
  }
});

app.get("/getCards", async (req, res) => {
  const uid = req.query.uid;
  try {
    const cards = await getCards(uid);
    res.json(cards);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(1115, () => {
  console.log("Server is running on port 1115");
});
exports.api = functions.https.onRequest(app);
