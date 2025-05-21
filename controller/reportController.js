const Employee = require('../models/Employee');
const MMCollection = require('../models/MMCollection');
const Deposit = require('../models/Deposit');

// Outstanding Report: Collection – Deposit = Outstanding
exports.getOutstandingReport = async (req, res) => {
  const employees = await Employee.find();
  const report = [];
  for (const emp of employees) {
    const collections = await MMCollection.find({ employeeId: emp._id });
    const deposits = await Deposit.find({ employeeId: emp._id });
    const totalCollection = collections.reduce((sum, c) => sum + c.amount, 0);
    const totalDeposit = deposits.reduce((sum, d) => sum + d.amount, 0);
    const mostRecentDate = [...collections, ...deposits]
      .map(t => t.date)
      .sort()
      .pop();
    report.push({
      employee: emp,
      totalCollection,
      totalDeposit,
      outstanding: totalCollection - totalDeposit,
      mostRecentDate
    });
  }
  res.json(report);
};

// Payment Report: Chronological, running balance logic
exports.getPaymentReport = async (req, res) => {
  const { employeeId } = req.params;
  const collections = await MMCollection.find({ employeeId }).sort({ date: 1 });
  const deposits = await Deposit.find({ employeeId }).sort({ date: 1 });
  // Merge and sort all transactions
  const all = [
    ...collections.map(c => ({ type: 'collection', date: c.date, amount: c.amount })),
    ...deposits.map(d => ({ type: 'deposit', date: d.date, amount: d.amount }))
  ].sort((a, b) => new Date(a.date) - new Date(b.date));

  let outstanding = 0;
  const report = [];
  for (const tx of all) {
    if (tx.type === 'collection') {
      outstanding += tx.amount;
    } else if (tx.type === 'deposit') {
      // Clear oldest dues first
      outstanding -= tx.amount;
      if (outstanding < 0) outstanding = 0;
    }
    report.push({ ...tx, runningOutstanding: outstanding });
  }
  res.json(report);
};
