const MMCollection = require('../models/MMCollection');

exports.addCollection = async (req, res) => {
  const { employeeId, date, amount } = req.body;
  const collection = new MMCollection({ employeeId, date, amount });
  await collection.save();
  res.status(201).json(collection);
};

exports.getCollections = async (req, res) => {
  const { employeeId } = req.query;
  const filter = employeeId ? { employeeId } : {};
  const collections = await MMCollection.find(filter).sort({ date: 1 });
  res.json(collections);
};

exports.addCollectionsBulk = async (req, res) => {
  const collections = req.body.collections;
  if (!Array.isArray(collections) || collections.length === 0) {
    return res.status(400).json({ message: 'Collections array required' });
  }
  // Validation: check for valid employeeId, date, amount
  for (const c of collections) {
    if (!c.employeeId || !c.date || typeof c.amount !== 'number' || c.amount <= 0) {
      return res.status(400).json({ message: 'Invalid collection entry' });
    }
  }
  // Prevent duplicate (employeeId + date)
  for (const c of collections) {
    const exists = await MMCollection.findOne({ employeeId: c.employeeId, date: c.date });
    if (exists) {
      return res.status(409).json({ message: `Duplicate entry for employeeId ${c.employeeId} on date ${c.date}` });
    }
  }
  const inserted = await MMCollection.insertMany(collections);
  res.status(201).json(inserted);
};
