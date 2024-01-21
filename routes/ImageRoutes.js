require('dotenv').config();
const express = require('express');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authToken = require('../middleware/AuthToken');
const router = express.Router();

router.post('/save-card-image', authToken, async (req, res) => {
  const { imageUrl, cardId, cardLevel, cardAttribute, cardType} = req.body;

  try {
    const userId = req.user.userId;

    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const imageData = Buffer.from(response.data).toString('base64');

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send('User not found');
    }

    user.cards.push({ cardId, imageData, cardLevel, cardAttribute, cardType });
    await user.save();

    res.status(200).json({ message: 'Image saved successfully.' });
  } catch (error) {
    console.error('Error saving the image:', error);
    res.status(500).json({ error: 'Error saving the image.' });
  }
});


router.get('/user/cards', authToken, async (req, res) => {
  try {
    const userId = req.user.userId;
    const user = await User.findById(userId).select('cards');
    if (!user) {
      return res.status(404).send('User not found');
    }
    res.json(user.cards);
  } catch (error) {
    console.error('Error fetching cards:', error);
    res.status(500).json({ error: 'Error fetching the cards' });
  }
});

module.exports = router;
