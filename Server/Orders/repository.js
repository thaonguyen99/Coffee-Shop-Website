const Order = require('./model');

const createOrder = async (order) => {
  return await Order.create(order);
}

const viewOrderByUser = async (id) => {
  return await Order.find({ user: id });
}

const findCart = async (id) => {
  return await Order.findOne({ user: id }).populate('user');
}

const findProduct = async (userid, productid) => {
  console.log(await Order.findOne({ user: userid }).findOne({ productID: productid }));
}

module.exports = {
  createOrder,
  viewOrderByUser,
  findCart,
  findProduct
};