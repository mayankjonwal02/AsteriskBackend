const express = require('express');
const router = express.Router();
const reportController = require('../controller/reportController');
const auth = require('../middlewares/auth');

router.get('/outstanding', auth, reportController.getOutstandingReport);
router.get('/payments/:employeeId', auth, reportController.getPaymentReport);

module.exports = router;
