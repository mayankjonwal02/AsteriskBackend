const express = require('express');
const router = express.Router();
const depositController = require('../controller/depositController');
const auth = require('../middlewares/auth');

router.post('/', depositController.addDeposit);
router.get('/', depositController.getDeposits);
router.post('/bulk', depositController.addDepositsBulk);

module.exports = router;
