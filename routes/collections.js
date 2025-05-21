const express = require('express');
const router = express.Router();
const collectionController = require('../controller/collectionController');
const auth = require('../middlewares/auth');

router.post('/', collectionController.addCollection);
router.get('/', collectionController.getCollections);
router.post('/bulk', collectionController.addCollectionsBulk);

module.exports = router;
