const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const auth = require('../middlewares/auth');

router.get('/', auth, employeeController.getEmployees);
router.get('/:id', auth, employeeController.getEmployeeById);
router.post('/', auth, employeeController.addEmployee); // Optional: add employee

module.exports = router;
