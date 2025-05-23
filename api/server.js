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
const cors = require('cors');
require('dotenv').config();

app.use(express.json());
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
};
app.use(cors(corsOptions));

// Connect to MongoDB
connectDB();
seedEmployees();

// Register /auth routes for login and token verification
app.use('/auth', authRoutes);
app.get('/', (req, res) => {
  res.send('Welcome to the MM API');
});
// Protect all routes below with auth middleware
// app.use(auth);

// Register /employees routes for employee management APIs
app.use('/employees',auth, employeeRoutes);
// Register /collections routes for MM collection APIs
app.use('/collections',auth, collectionRoutes);
// Register /deposits routes for MM deposit APIs
app.use('/deposits',auth, depositRoutes);
// Register /reports routes for outstanding and payment report APIs
app.use('/reports',auth, reportRoutes);
// TODO: Add other routes here


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
module.exports = app;