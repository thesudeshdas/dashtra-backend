const Product = require('../models/product.model');
// const { sanitiseList } = require('../utils/functions');

exports.product_list_get = async (req, res) => {
  try {
    const productsList = await Product.find();
    // const productsList = {test: 'scuces'}

    res.status(200).json({
      title: 'Products List',
      success: true,
      message: 'Fetching the products were successful, enjoy ;)',
      productsList: productsList,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Product List',
      success: false,
      message: 'Uh Oh :( Products could not be fetched. ' + err.message,
    });
  }
};

exports.product_create_post = async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const addedProduct = await newProduct.save();

    res.status(200).json({
      title: 'Add Product',
      success: true,
      message: 'This product is added to database.',
      product: addedProduct,
    });
  } catch (err) {
    res.status(500).json({
      title: 'Add Product',
      success: false,
      message: 'This product could not be added to database.' + err.message,
    });
  }
};

exports.product_find_list_param = async (req, res, next, id) => {
  try {
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        title: 'Find Product',
        success: false,
        message: 'Product not found by this Id',
      });
    }

    req.product = product;
    next();
  } catch (err) {
    res.status(500).json({
      title: 'Find Product',
      success: false,
      message: 'Error while retrieving product',
    });
  }
};

exports.product_detail_get = (req, res) => {
  let { product } = req;

  res.status(200).json({
    title: 'Product Detail',
    success: true,
    message: 'Product detail is fetched successfully',
    product: product,
  });
};
