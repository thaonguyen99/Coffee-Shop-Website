const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  cart: [{
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
  }],
  orderDate: {
    type: Date
  },
  shipAddress: {
    type: String,
    require: true
  },
  shippingFee: {
    type: Number,
    default: 15000
  },
  total: {
    type: Number
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;