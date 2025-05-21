const mongoose = require('mongoose');

const depositSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('Deposit', depositSchema);
