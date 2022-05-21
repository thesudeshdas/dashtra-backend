const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true
  },
  productsList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required']
      },
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],
  total: {
    type: Number,
    default: 0,
  },
});

CartSchema.virtual('url').get('/cart/' + this._id);

module.exports = mongoose.model('Cart', CartSchema);

/*
TODO -
1. User to be ref and object
*/
