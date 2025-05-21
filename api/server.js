// Entry point for Express server
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const connectDB = require('../config/db');
const authRoutes = require('../routes/auth');
const employeeRoutes = require('../routes/employees');
const collectionRoutes = require('../routes/collections');
const depositRoutes = require('../routes/deposits');
const reportRoutes = require('../routes/reports');
const { seedEmployees } = require('../controller/employeeController');
const auth = require('../middlewares/auth');
require('dotenv').config();

app.use(express.json());

// Connect to MongoDB
connectDB();
seedEmployees();

// Register /auth routes for login and token verification
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the MM API');
});
// Protect all routes below with auth middleware
app.use(auth);

// Register /employees routes for employee management APIs
app.use('/employees', employeeRoutes);
// Register /collections routes for MM collection APIs
app.use('/collections', collectionRoutes);
// Register /deposits routes for MM deposit APIs
app.use('/deposits', depositRoutes);
// Register /reports routes for outstanding and payment report APIs
app.use('/reports', reportRoutes);
// TODO: Add other routes here


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
