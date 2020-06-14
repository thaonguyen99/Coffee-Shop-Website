const express = require('express');
const OrderRouter = express.Router();
const checkUser = require('../config/middleware/checkUser');
const UserRepository = require('../Users/repository');
const ProductRepository = require('../Products/repository');
const OrderRepository = require('./repository');
const User = require('../Users/model');

OrderRouter.route('/checkout')
  .get(checkUser, async (req, res) => {
    const orders = await OrderRepository.viewOrderByUser(user._id);
    const products = user.cart;
    let totalPrice = 0;
    let listProduct = [];
    let list = [];
    let amount = 0;
    for (let i = 0; i < products.length; i++) {
      const product = await ProductRepository.getProductByID(products[i].productID);
      amount = products[i].amount;
      totalPrice += products[i].amount * product.price;
      listProduct.push({ product, amount });
    }

    for (let i = 0; i < orders.length; i++) {
      let cart = orders[i].cart;
      let product;
      for (let j = 0; j < cart.length; j++) {
        product = await ProductRepository.getProductByID(cart[j].productID);
      }
      list.push({ product, cart });
    }
    console.log(products[0].productID);
    const view = await OrderRepository.findProduct(user._id, products[0].productID);
    console.log(view);

    return res.render('checkout', { listProduct, totalPrice, orders, list });
  })
  .post(checkUser, async (req, res) => {
    const cart = user.cart;
    const shipAddress = user.address;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = await ProductRepository.getProductByID(cart[i].productID);
      amount = cart[i].amount;
      total += cart[i].amount * product.price;
    }
    user.cart = [];
    await OrderRepository.createOrder({ user: user._id, cart, shipAddress, total, orderDate: Date.now() });
    await UserRepository.updateUser(user._id, { cart: user.cart });
    return res.redirect('/checkout');

  })

module.exports = OrderRouter;