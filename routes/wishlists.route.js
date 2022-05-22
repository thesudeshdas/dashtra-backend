const express = require('express');
const router = express.Router();

const wishlist_controller = require('../controllers/wishlist.controller');

router.get('/', wishlist_controller.wishlist_list_get);

module.exports = router;