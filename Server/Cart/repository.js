const Cart = require('./model');

const create = async (cart) => { return await Cart.create(cart); }

const findByUserId = async (id) => {
  return await Cart.findOne({ userID: id });
}

module.exports = {
  create,
  findByUserId
}
