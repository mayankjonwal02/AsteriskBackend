const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
const auth = require('../middlewares/auth');

router.get('/outstanding', reportController.getOutstandingReport);
router.get('/payments/:employeeId', reportController.getPaymentReport);

module.exports = router;
