const express = require('express')
const router = express.Router();

const cart_controller = require('../controllers/cart.controller');
const Cart = require('../models/cart.model');

router.get('/', cart_controller.cart_list_get);
router.post('/', cart_controller.cart_add_post);

router.param('userId', cart_controller.cart_find_user_param);

router.get('/:userId', cart_controller.cart_details_user_get);

router.post('/:userId/add', cart_controller.cart_add_product_post);
router.post('/:userId/remove', cart_controller.cart_remove_product_post);

router.post('/:userId/increase', cart_controller.cart_increase_quantity_post);
router.post('/:userId/decrease', cart_controller.cart_decrease_quantity_post);

module.exports = router;