var express = require('express');
var connectDB = require('../db/conn.js');
var Company = require('../models/Company.js');
var Address = require('../models/Address.js');
var router = express.Router();

connectDB().then(() => {
  router.get('/all-companies', async function (req, res, next) {
    try {
      const companies = await Company.find();
      res.status(200).send(companies);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
    
  });

  router.get('/:id', async function(req, res, next) {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
        
        res.status(200).json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

  router.post('/add', async function (req, res, next) {
    try {
        const address = new Address(req.body.address);

        const savedaddress = await address.save();

        const company = new Company({
            ...req.body,
            address: savedaddress._id
        });
        
        const savedcompany = await company.save();

        res.status(201).json(savedcompany);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });
  
  router.get('/:id', async function(req, res, next) {
    try {
        const company = await Company.findById(req.params.id);

        if (!company) {
          return res.status(404).json({ message: 'Company not found' });
        }
        
        res.status(200).json(company);
    } catch (err) {
      res.status(500).json({ error: err.message });
  }
});


router.put('/edit/:id', async function (req, res, next) {
  try {
        const company = await Company.findById(req.params.id);

        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const address = await Address.findById(req.body.address._id);

          if (!address) {
            return res.status(404).json({ message: 'Address not found' });
          }

          Object.assign(address, req.body.address);
          await address.save();

          Object.assign(company, req.body.company);
    
          
          const savedcompany = await company.save();

          res.status(201).json(savedcompany);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.delete('/delete/:id', async function (req, res, next) {
    try {

        const company = await Company.findByIdAndDelete(req.params.id);

      if (!company) {
        return res.status(404).json({ message: 'Company not found' });
      }
      
      res.status(200).json(company);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});
}).catch((err) => {
  console.error('Errore di connessione al database:', err);
});

module.exports = router;
