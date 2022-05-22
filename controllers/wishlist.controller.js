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
