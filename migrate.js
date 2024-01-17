// Update UserSchema for whatever we add to the User model

require('dotenv').config(); 
const mongoose = require('mongoose');
const User = require('./models/User'); 

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected'))
  .catch(err => console.error('MongoDB connection error:', err));

async function addCardsFieldToUsers() {
  const usersWithoutCards = await User.find({ cards: { $exists: false } });
  
  const bulkOps = usersWithoutCards.map(user => ({
    updateOne: {
      filter: { _id: user._id },
      update: { $set: { cards: [] } } 
    }
  }));
  
  if (bulkOps.length) {
    await User.bulkWrite(bulkOps);
    console.log('Updated users with cards field.');
  } else {
    console.log('No users need updating.');
  }
}

addCardsFieldToUsers()
  .then(() => {
    console.log('Migration completed successfully');
    process.exit(0);
  })
  .catch(error => {
    console.error('Migration failed', error);
    process.exit(1);
  });