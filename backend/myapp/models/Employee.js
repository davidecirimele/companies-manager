const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: true },
  role: { type: String, required: true },
    phone: { type: String, required: true },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address' },
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee;