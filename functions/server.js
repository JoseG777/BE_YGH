const functions = require("firebase-functions");
const admin = require("firebase-admin");

// Set up Express server
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

// Initialize Express
const app = express();
app.use(cors({origin: true}));
app.use(bodyParser.json());

const corsHandler = cors({origin: true});

// Connect to MongoDB
const ConnectMongo = require('./apis/MongoConnect');
ConnectMongo();

// Import functions
const createUser = require("./apis/CreateUser");
const findEmail = require("./apis/FindEmail");
const saveImage = require("./apis/SaveImage");

// Set up routes
app.post("/createUser", async (req, res) => {
    corsHandler(req, res, async () => {
        const data = req.body;
        const user = await createUser(data);
        res.json(user);
    });
});

app.get("/findEmail", async (req, res) => {
    corsHandler(req, res, async () => {
        const username = req.query.username; 
        const user = await findEmail(username); 
        res.json(user); 
    });
});

app.post("/saveImage", async (req, res) => {
    try {
        const imageUrl = await saveImage(req.body); // Expecting { uid, name, url } in req.body
        res.status(200).json({ success: true, message: "Image saved successfully!", imageUrl });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to save image", error: error.message });
    }
});

exports.api = functions.https.onRequest(app);