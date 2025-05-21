const mongoose = require('mongoose');

const mmCollectionSchema = new mongoose.Schema({
  employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
  date: { type: Date, required: true },
  amount: { type: Number, required: true }
});

module.exports = mongoose.model('MMCollection', mmCollectionSchema);
