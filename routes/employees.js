const express = require('express');
const router = express.Router();
const employeeController = require('../controller/employeeController');
const auth = require('../middlewares/auth');

router.get('/', employeeController.getEmployees);
router.get('/:id', employeeController.getEmployeeById);
router.post('/', employeeController.addEmployee); // Optional: add employee

module.exports = router;
