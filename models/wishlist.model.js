const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WishlistSchema = new Schema({
  owner: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'User',
    unique: true,
  },
  productsList: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Product is required'],
      },
    },
  ],
});

WishlistSchema.virtual('url').get('/wishlist/' + this._id);

module.exports = mongoose.model('Wishlist', WishlistSchema);
