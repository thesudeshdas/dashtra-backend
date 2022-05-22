const express = require('express');
const router = express.Router();

const wishlist_controller = require('../controllers/wishlist.controller');

router.get('/', wishlist_controller.wishlist_list_get);
router.post('/', wishlist_controller.wishlist_add_post);

router.param('userId', wishlist_controller.wishlist_find_user_param);

router.get('/:userId', wishlist_controller.wishlist_details_user_get);

module.exports = router;
