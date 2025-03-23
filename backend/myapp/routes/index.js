var express = require('express');
var connectDB = require('../db/conn.js');
var router = express.Router();

connectDB().then(() => {
  console.log('Database connesso');

  router.get('/', async function (req, res, next) {
    try {
      console.log('Route / richiesta');
    } catch (err) {
      console.error('Errore durante il recupero delle aziende:', err);
      res.status(500).send('Errore nel server');
    }
  });
}).catch((err) => {
  console.error('Errore di connessione al database:', err);
});

module.exports = router;