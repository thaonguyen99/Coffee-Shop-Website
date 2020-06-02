const Order = require('./model');

const createOrder = async (order) => {
  return await Order.create(order);
}

const viewOrderByUser = async (user) => {
  return await Order.find({ user });
}