const express = require('express');
const router = express.Router();
const authController = require('../controller/authController');

router.post('/login', authController.login);
router.get('/verify', authController.verifyToken);

module.exports = router;
