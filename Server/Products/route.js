const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const checkUser = require('../config/middleware/checkUser');

//View menu 
ProductRouter.get('/product', checkUser, async (req, res) => {
  const coffee = await ProductRepository.getProductByCategory('Coffee');
  const tea = await ProductRepository.getProductByCategory('Tea');
  const pastry = await ProductRepository.getProductByCategory('Pastry');

  return res.render('product', { user, coffee, tea, pastry });
})


module.exports = ProductRouter;