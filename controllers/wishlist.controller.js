const User = require('../models/user.model');
const Wishlist = require('../models/wishlist.model');

exports.wishlist_list_get = async (req, res) => {
  try {
    const wishlist = await Wishlist.find()
      .populate('productsList.product')
      .populate('owner');

    res.status(200).json({
      title: 'Wishlist list',
      success: true,
      message: 'Fetching wishlist was successful.',
      wishlist,
    });
  } catch (error) {
    res.status(500).json({
      title: 'Wishlist list',
      success: false,
      message: 'Uh Oh :( Wishlist could not be fetched' + error.message,
    });
  }
};

exports.wishlist_add_post = async (req, res) => {
  try {
    const newWishlist = new Wishlist(req.body);
    const addedWishlist = await newWishlist.save();

    res.status(200).json({
      title: 'Add Wishlist',
      success: true,
      message: 'New Wishlist was created successfully',
      newWishlist,
    });
  } catch (error) {
    res.status(500).json({
      title: 'Add Wishlist',
      success: false,
      message: 'Uh Oh. Error while adding wishlist' + error.message,
    });
  }
};

exports.wishlist_find_user_param = async (req, res, next, id) => {
  try {
    const user = await User.findById(id);

    if (user) {
      const userWishlist = await Wishlist.findOne({ owner: user._id })
        .populate('productsList.product')
        .populate('owner');

      if (!userWishlist) {
        return res.status(404).json({
          title: 'Find User Wishlist',
          success: false,
          message: 'No wishlist for this user id.',
        });
      }

      req.user = user;
      req.userWishlist = userWishlist;
      next();
    } else {
      return res.status(404).json({
        title: 'Find User Cart',
        success: false,
        message: 'No user by this id',
      });
    }
  } catch (error) {
    res.status(500).json({
      title: 'Find User Wishlist',
      success: false,
      message: 'Error while retrieving user wishlist. ' + err.message,
    });
  }
};

exports.wishlist_details_user_get = async (req, res) => {
  let { userWishlist } = req;

  res.status(200).json({
    title: 'User wishlist',
    success: true,
    message: 'User wishlist is here.',
    wishlist: userWishlist,
  });
};

exports.wishlist_add_product_post = async (req, res) => {
  const { productId } = req.body;
  const { userWishlist } = req;

  console.log(userWishlist);

  try {
    const product = userWishlist.productsList.find(
      (item) => item.product._id == productId
    );

    if (!product) {
      const updatedProductsList = [
        ...userWishlist.productsList,
        { product: productId },
      ];

      userWishlist.productsList = updatedProductsList;

      const updatedUserWishlist = await userWishlist.save();

      return res.status(200).json({
        title: 'Add product to wishlist',
        success: true,
        message: 'The product was added to wishlist',
        addedProduct: product,
      });
    }

    return res.status(409).json({
      title: 'Add product to wishlist',
      success: false,
      message: 'The product already exists in cart',
    });
  } catch (error) {
    res.status(500).json({
      title: 'Add product to wishlist',
      success: false,
      message: 'Error while adding product to wishlist. ' + err.message,
    });
  }
};
