const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    minlength: [2, 'Brand must be at least 2 characters long'],
    maxlength: [50, 'Brand must be less than 50 characters long'],
  },
  categories: [
    {
      type: String,
      required: [true, 'At least one category is required'],
    },
  ],
  description: {
    type: String,
    required: [true, 'Description is required'],
    minlength: [10, 'Description must be at least 10 characters long'],
    maxlength: [500, 'Description must be less than 500 characters long'],
  },
  fastDelivery: {
    type: Boolean,
    default: false,
  },
  images: [
    {
      src: { type: String, required: [true, 'At least one image is required'] },
      alt: { type: String, required: [true, 'Alt text is mandatory'] },
    },
  ],
  link: { type: String, required: [true, 'Link is required'] },
  name: {
    type: String,
    required: [true, 'Name is required'],
    minlength: [2, 'Name must be at least 2 characters long'],
    maxlength: [100, 'Name must be less than 100 characters long'],
  },
  price: {
    original: {
      type: Number,
      required: [true, 'Original price is required'],
    },
    discounted: {
      type: Number,
      required: [true, 'Discounted price is required'],
    },
    discount: {
      type: Number,
      default: 0,
    },
  },
  rating: {
    stars: { type: Number, min: 0, max: 5, default: 0 },
    number: { type: Number, default: 0 },
  },
  specifications: [
    {
      heading: String,
      detail: String,
    },
  ],
  status: {
    type: String,
    enum: ['active', 'soldOut', 'deprecated'],
    default: 'active',
  },
  stock: {
    type: Number,
    default: 10,
  },
});

module.exports = mongoose.model('Product', ProductSchema);
