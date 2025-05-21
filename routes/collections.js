const express = require('express');
const router = express.Router();
const collectionController = require('../controller/collectionController');
const auth = require('../middlewares/auth');

router.post('/', auth, collectionController.addCollection);
router.get('/', auth, collectionController.getCollections);
router.post('/bulk', auth, collectionController.addCollectionsBulk);

module.exports = router;
