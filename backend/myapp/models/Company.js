const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
    phone: { type: String, required: true },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Employee' }],
  address: { type: mongoose.Schema.Types.ObjectId, ref: 'Address', required: true},
});

const Company = mongoose.model('Company', companySchema);

module.exports = Company;