var express = require('express');
var connectDB = require('../db/conn.js');
var Employee = require('../models/Employee.js');
var Company = require('../models/Company.js');
var Address = require('../models/Address.js');
var router = express.Router();

connectDB().then(() => {
    router.get('/all-employees', async function (req, res, next) {
        try {
            const employees = await Employee.find();
            res.status(200).json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    router.get('/company-employees/:id', async function (req, res, next) {
        try {
            const company = await Company.findById(req.params.id);

            const employees = await Promise.all(
                company.employees.map(employeeId => Employee.findById(employeeId))
            );

            res.status(200).json(employees);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
  });
    
  router.get('/:id', async function(req, res, next) {
      try {
          const employee = await Employee.findById(req.params.id);

          if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
          }
          
          res.status(200).json(employee);
      } catch (err) {
        res.status(500).json({ error: err.message });
    }
  });

    router.post('/add', async function (req, res, next) {
        try {
            const address = new Address(req.body.address);

            const savedaddress = await address.save();

            const employee = new Employee({
                ...req.body,
                address: savedaddress._id
            });
            
            const savedemployee = await employee.save();
            
            await Company.findByIdAndUpdate(employee.company, {
                $push: { employees: savedemployee._id }
            });

            res.status(201).json(savedemployee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    router.put('/edit/:id', async function (req, res, next) {
        try {

            const employee = await Employee.findById(req.params.id);

            const old_company = await Company.findById(employee.company);

            if (!employee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            const address = await Address.findById(req.body.address._id);

            if (!address) {
                return res.status(404).json({ message: 'Address not found' });
            }

            Object.assign(address, req.body.address);
            await address.save();

            Object.assign(employee, req.body.employee);
            
            const savedemployee = await employee.save();
            
            const new_company = await Company.findById(savedemployee.company);

            if (!new_company) {
                return res.status(404).json({ message: 'Company not found' });
            }

            if (old_company._id.toString() !== new_company._id.toString()) {
                if (!new_company.employees.includes(req.params.id)) {
                    await Company.findByIdAndUpdate(new_company, {
                        $push: { employees: savedemployee._id }
                    });
                }
                await Company.findByIdAndUpdate(old_company, {
                    $pull: { employees: savedemployee._id }
                });
            }
            res.status(201).json({ message: { savedemployee, old_company, new_company } });
            
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
    
    router.delete('/delete/:id', async function (req, res, next) {
        try {

            const employee = await Employee.findById(req.params.id)

            await Company.findByIdAndUpdate(employee.company, {
                $pull: { employees: employee._id }
            });

            const deletedemployee = await employee.deleteOne();;

            if (!deletedemployee) {
                return res.status(404).json({ message: 'Employee not found' });
            }

            await Company.findByIdAndUpdate(deletedemployee.company, {
                $pull: { employees: deletedemployee._id }
            });
            
            res.status(200).json(deletedemployee);
        } catch (err) {
            res.status(500).json({ error: err.message });
        }
    });
}).catch((err) => {
  console.error('Errore di connessione al database:', err);
});

module.exports = router;
