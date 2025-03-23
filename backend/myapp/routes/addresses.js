var express = require('express');
var connectDB = require('../db/conn.js');
var Address = require('../models/Address.js');
var router = express.Router();

connectDB().then(() => {
  router.get('/all-addresses', async function(req, res, next) {
    try {
        const addresses = await Address.find();
        res.status(200).send(addresses);
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
  });
    
  router.get('/:id', async function(req, res, next) {
    try {
        const address = await Address.findById(req.params.id);

        if (!address) {
          return res.status(404).json({ message: 'Company not found' });
        }
        
        res.status(200).json(address);
    } catch (err) {
      res.status(500).json({ error: err.message });
  }
});
}).catch((err) => {
  console.error('Errore di connessione al database:', err);
});

module.exports = router;
