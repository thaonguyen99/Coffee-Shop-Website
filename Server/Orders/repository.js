const Order = require('./model');

const createOrder = async (order) => {
  return await Order.create(order);
}

const viewOrderByUser = async (id) => {
  return await Order.find({ user: id }).populate({ path: 'cart.productID', model: 'Product' });
}

const findCart = async (id) => {
  return await Order.find({ user: id }).populate('cart.productID');
}


module.exports = {
  createOrder,
  viewOrderByUser,
  findCart
};