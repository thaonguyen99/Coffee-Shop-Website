const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  userID: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  productID: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  amount: {
    default: 1,
    type: Number
  },
  size: String,
  total: Number
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;
