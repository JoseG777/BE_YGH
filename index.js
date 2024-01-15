require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));

app.get('/', (req, res) => {
    res.send('Hello World!');
});
  
  
const PORT = process.env.PORT || 5052;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

