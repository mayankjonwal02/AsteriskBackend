const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Hardcoded admin credentials from .env
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

exports.login = async (req, res) => {
  const { username, password } = req.body;
  if (username !== ADMIN_USERNAME || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ username, role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
  res.json({ token });
};

exports.verifyToken = (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });
  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ message: 'Invalid token' });
    res.json({ valid: true, user });
  });
};
