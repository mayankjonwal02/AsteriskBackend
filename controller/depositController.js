const Deposit = require('../models/Deposit');

exports.addDeposit = async (req, res) => {
  const { employeeId, date, amount } = req.body;
  const deposit = new Deposit({ employeeId, date, amount });
  await deposit.save();
  res.status(201).json(deposit);
};

exports.getDeposits = async (req, res) => {
  const { employeeId } = req.query;
  const filter = employeeId ? { employeeId } : {};
  const deposits = await Deposit.find(filter).sort({ date: 1 });
  res.json(deposits);
};

exports.addDepositsBulk = async (req, res) => {
  const deposits = req.body.deposits;
  if (!Array.isArray(deposits) || deposits.length === 0) {
    return res.status(400).json({ message: 'Deposits array required' });
  }
  // Validation: check for valid employeeId, date, amount
  for (const d of deposits) {
    if (!d.employeeId || !d.date || typeof d.amount !== 'number' || d.amount <= 0) {
      return res.status(400).json({ message: 'Invalid deposit entry' });
    }
  }
  // Prevent duplicate (employeeId + date)
  for (const d of deposits) {
    const exists = await Deposit.findOne({ employeeId: d.employeeId, date: d.date });
    if (exists) {
      return res.status(409).json({ message: `Duplicate entry for employeeId ${d.employeeId} on date ${d.date}` });
    }
  }
  const inserted = await Deposit.insertMany(deposits);
  res.status(201).json(inserted);
};
