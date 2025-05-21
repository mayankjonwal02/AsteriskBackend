const express = require('express');
const router = express.Router();
const depositController = require('../controller/depositController');
const auth = require('../middlewares/auth');

router.post('/', auth, depositController.addDeposit);
router.get('/', auth, depositController.getDeposits);
router.post('/bulk', auth, depositController.addDepositsBulk);

module.exports = router;
