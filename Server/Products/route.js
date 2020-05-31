const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const checkUser = require('../config/middleware/checkUser');

//View menu 
ProductRouter.get('/menu', checkUser, async (req, res) => {
  const products = await ProductRepository.getAllProducts();

  return res.render('menu', { user, products });
})

//View products by category
ProductRouter.get('/menu/:category', checkUser, async (req, res) => {
  const { category } = req.params;

  const products = await ProductRepository.getProductByCategory(category);

  return res.render(`${category}`);
})

module.exports = ProductRouter;