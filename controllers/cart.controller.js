const Cart = require('../models/cart.model');
const User = require('../models/user.model');
// const { sanitiseList } = require('../utils/functions');

exports.cart_list_get = async (req, res) => {
  try {
    const cartsList = await Cart.find()
      .populate('productsList.product')
      .populate('owner');

    res.status(200).json({
      title: 'Cart List',
      success: true,
      message: 'Fetching the carts list was successful, enjoy ;)',
      cartsList,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Cart List',
      success: false,
      message: 'Uh Oh :( Carts could not be fetched. ' + err.message,
    });
  }
};

exports.cart_add_post = async (req, res) => {
  try {
    const newCart = new Cart(req.body);
    const addedCart = await newCart.save();

    res.status(200).json({
      title: 'New Cart',
      success: true,
      message: 'New Cart was created successfully.',
      newCart,
    });
  } catch (err) {
    res.status(500).json({
      title: 'New Cart',
      success: false,
      message: 'Error while creating new cart. ' + err.message,
    });
  }
};

exports.cart_find_user_param = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (user) {
      const userCart = await Cart.findOne({ owner: user._id })
        .populate('productsList.product')
        .populate('owner');

      if (!userCart) {
        return res.status(404).json({
          title: 'Find User Cart',
          success: false,
          message: 'No cart for this user id.',
        });
      }

      req.user = user;
      req.userCart = userCart;
      next();
    } else {
      return res.status(404).json({
        title: 'Find User Cart',
        success: false,
        message: 'No user by this id.',
      });
    }
  } catch (err) {
    res.status(500).json({
      title: 'Find User Cart',
      success: false,
      message: 'Error while retrieving user cart. ' + err.message,
    });
  }
};

exports.cart_details_user_get = async (req, res) => {
  let { userCart } = req;

  const x = userCart;

  res.status(200).json({
    title: 'User Cart',
    success: true,
    message: 'User cart is here.',
    cart: x,
  });
};


exports.cart_add_product_post = async (req, res) => {
  const { productId, newTotal } = req.body;
  const { userCart } = req;

  try {
    const product = userCart.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      const updatedProductsList = [
        ...userCart.productsList,
        {
          product: productId,
          quantity: 1,
        },
      ];

      userCart.productsList = updatedProductsList;
      userCart.total = newTotal;

      const updatedUserCart = await userCart.save();

      return res.status(200).json({
        title: 'Add product to cart',
        success: true,
        message: 'The product was added to cart',
        addedProduct: product,
      });
    }

    return res.status(409).json({
      title: 'Add product to cart',
      success: false,
      message: 'The product already exists in cart',
    });
  } catch (err) {
    res.status(500).json({
      title: 'Add Product to Cart',
      success: false,
      message: 'Error while adding product to cart. ' + err.message,
    });
  }
};

exports.cart_remove_product_post = async (req, res) => {
  const { productId, newTotal } = req.body;
  const { userCart } = req;

  try {
    const product = userCart.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      res.status(409).json({
        title: 'Remove product from cart',
        success: false,
        message: 'The product does not exist in cart',
      });
    }

    const updatedProductsList = userCart.productsList.filter(
      (item) => item.product._id != productId
    );

    userCart.productsList = updatedProductsList;
    userCart.total = newTotal;

    const updatedUserCart = await userCart.save();

    res.status(200).json({
      title: 'Remove product from cart',
      success: true,
      message: 'The product was removed from cart',
      removedProduct: product,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Remove product from cart',
      success: false,
      message: 'Error while removing product from cart. ' + err.message,
    });
  }
};

exports.cart_increase_quantity_post = async (req, res) => {
  const { productId, newTotal } = req.body;
  const { userCart } = req;

  try {
    const product = userCart.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      res.status(409).json({
        title: 'Increase product quantity in cart',
        success: false,
        message: 'The product does not exist in cart',
      });
    }

    const updatedProductsList = userCart.productsList.map((item) =>
      item.product._id == productId
        ? { ...item._doc, quantity: item.quantity + 1 }
        : item
    );

    userCart.productsList = updatedProductsList;
    userCart.total = newTotal;

    const updatedUserCart = await userCart.save();

    res.status(200).json({
      title: 'Increase product quantity in cart',
      success: true,
      message: 'Product quantity increased by one successfully',
      updatedProductsList,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Increase product quantity in cart',
      success: false,
      message:
        'Error while increasing product quantity in cart. ' + err.message,
    });
  }
};

exports.cart_decrease_quantity_post = async (req, res) => {
  const { productId, newTotal } = req.body;
  const { userCart } = req;

  try {
    const product = userCart.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      res.status(409).json({
        title: 'Decrease product quantity in cart',
        success: false,
        message: 'The product does not exist in cart',
      });
    }

    const updatedProductsList = userCart.productsList.map((item) =>
      item.product._id == productId && item.quantity > 1
        ? { ...item._doc, quantity: item.quantity - 1 }
        : item
    );

    userCart.productsList = updatedProductsList;
    userCart.total = newTotal;

    const updatedUserCart = await userCart.save();

    res.status(200).json({
      title: 'Decrease product quantity in cart',
      success: true,
      message:
        'Product quantity decreased by one, or deleted if there was one product',
      updatedProductsList,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Decrease product quantity in cart',
      success: false,
      message:
        'Error while decreasing product quantity in cart. ' + err.message,
    });
  }
};

/*
TODO -
1. Price calculation in BE
2. Product decrease & deletion
*/
