const express = require('express');
const OrderRouter = express.Router();
const checkUser = require('../config/middleware/checkUser');
const UserRepository = require('../Users/repository');
const ProductRepository = require('../Products/repository');
const OrderRepository = require('./repository');
const User = require('../Users/model');
const Order = require('./model');

OrderRouter.route('/checkout')
  .get(checkUser, async (req, res) => {
    const orders = await OrderRepository.viewOrderByUser(user._id);
    const products = user.cart;
    let totalPrice = 0;
    let listProduct = [];
    let final = [];
    let amount = 0;
    let size;
    for (let i = 0; i < products.length; i++) {
      const product = await ProductRepository.getProductByID(products[i].productID);
      amount = products[i].amount;
      size = products[i].size;
      totalPrice += products[i].amount * product.price;
      listProduct.push({ product, amount, size });
    }
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i].cart;
      let amount;
      let size;
      let list = [];
      for (let j = 0; j < order.length; j++) {
        const pro = await ProductRepository.getProductByID(order[j].productID);
        amount = order[j].amount;
        size = order[j].size;
        list.push({ pro, amount, size });
      }
      final.unshift({ list, orders: orders[i] });

    }



    return res.render('checkout', { listProduct, totalPrice, orders, final });
  })
  .post(checkUser, async (req, res) => {
    const cart = user.cart;
    const shipAddress = user.address;
    let total = 0;
    for (let i = 0; i < cart.length; i++) {
      const product = await ProductRepository.getProductByID(cart[i].productID);
      amount = cart[i].amount;
      total += cart[i].amount * product.price;
      let count = product.sellcount + amount;
      await ProductRepository.updateProduct(product._id, count);
    }
    await OrderRepository.createOrder({ user: user._id, cart, shipAddress, total, orderDate: Date.now() });
    user.cart = [];
    await UserRepository.updateUser(user._id, { cart: user.cart });
    return res.redirect('/checkout');

  })
//View history 

OrderRouter.route('/history')
  .get(checkUser, async (req, res) => {
    if (!user) {
      return res.redirect('/login');
    }
    const orders = await OrderRepository.viewOrderByUser(user._id);
    let final = [];
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i].cart;
      let amount;
      let size;
      let list = [];
      for (let j = 0; j < order.length; j++) {
        const pro = await ProductRepository.getProductByID(order[j].productID);
        amount = order[j].amount;
        size = order[j].size;
        list.push({ pro, amount, size });
      }
      final.unshift({ list, orders: orders[i] });

    }



    return res.render('history', { orders, final });
  });

//Admin route


module.exports = OrderRouter;