const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const checkUser = require('../config/middleware/checkUser');
const { upload } = require('../config/middleware/multer');
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
    const { name, category, description, price, size } = req.body;
    const photo = 'http://localhost:5000/img/' + req.file.filename;
    const newProduct = { name, category, description, price, size, photo };

    const product = await ProductRepository.createProduct(newProduct);

    return res.redirect('/product');
  }
  );






module.exports = ProductRouter;