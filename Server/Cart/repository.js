const Cart = require('./model');

const createCart = async (cart) => {
  return await Cart.create(cart);
}

const updateCart = async (id, newCart) => {
  return await Cart.findByIdAndUpdate(id, newCart, { new: true });
}

module.exports = {
  createCart,
  updateCart
}