const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const checkUser = require('../config/middleware/checkUser');
var multer = require('multer')
var upload = multer({ dest: '../view/img/' })

//View menu 
ProductRouter.get('/product', checkUser, async (req, res) => {
  const coffee = await ProductRepository.getProductByCategory('Coffee');
  const tea = await ProductRepository.getProductByCategory('Tea');
  const pastry = await ProductRepository.getProductByCategory('Pastry');

  return res.render('product', { user, coffee, tea, pastry });
});

//Add products
ProductRouter.route('/add-product')
  .get((req, res) => {
    return res.render('add-product');
  })
  .post(upload.single('photo'), async (req, res) => {
    const { name, category, description, price, size, photo } = req.body;

    await ProductRepository.createProduct(req.body);

    return res.redirect('/product');
  }
  )


module.exports = ProductRouter;