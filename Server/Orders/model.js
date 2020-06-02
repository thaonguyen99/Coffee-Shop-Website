const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: 'User'
  },
  orderDate: {
    type: Date
  },
  orderStatus: {
    type: String,
    enum: [
      'Order Succeed',
      'Delivering',
      'Comfirm'
    ]
  },
  shipAddress: {
    type: String,
    require: true
  },
  shippingFee: {
    type: Number
  }
});

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;