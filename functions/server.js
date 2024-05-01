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

// Set up routes
app.post("/createUser", async (req, res) => {
    corsHandler(req, res, async () => {
        const data = req.body;
        const user = await createUser(data);
        res.json(user);
    });
});


exports.api = functions.https.onRequest(app);