require('dotenv').config(); 

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/AuthRoutes');
const imageRoutes = require('./routes/ImageRoutes');
const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Successfully connected to MongoDB'))
  .catch(err => console.log('MongoDB connection error:', err));
  
app.use('/api/auth', authRoutes);
app.use('/api/image', imageRoutes);

app.listen(5052, () => {
    console.log('Server is running on port 5052');
});

