const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  product: {
    type: mongoose.Types.ObjectId,
    ref: 'Product'
  },
  quantity: Number,
  total: Number
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;