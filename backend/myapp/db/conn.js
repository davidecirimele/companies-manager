const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/test');
    console.log('Database connesso');
  } catch (err) {
    console.error('Errore di connessione al database:', err);
  }
};

module.exports = connectDB;