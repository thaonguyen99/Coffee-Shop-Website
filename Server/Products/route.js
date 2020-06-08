const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const UserRepository = require('../Users/repository');
const checkUser = require('../config/middleware/checkUser');
const { upload } = require('../config/middleware/multer');
//View menu & add to cart
ProductRouter.route('/product')
  .get(checkUser, async (req, res) => {
    const coffee = await ProductRepository.getProductByCategory('Coffee');
    const tea = await ProductRepository.getProductByCategory('Tea');
    const pastry = await ProductRepository.getProductByCategory('Pastry');
    req.session.cart = [];
    return res.render('product', { user, coffee, tea, pastry });
  })
  .post(checkUser, async (req, res) => {
    const { size, productID } = req.body;
    const product = await ProductRepository.getProductByID(productID);

    if (!user) {
      // const newProduct = { product, size };
      // req.session.cart.unshift(newProduct);
      // console.log(req.session);
      res.json('Sign Up');
    }
    else {
      let isFound = false;
      for (let i = 0; i < user.cart.length; i++) {
        if (user.cart[i].productID == productID) {
          if (user.cart[i].size == size) {
            isFound = true;
          }
        }
      }
      if (isFound == false) {
        user.cart.unshift({ productID, size });
      }

      user = await UserRepository.updateUser(user._id, { cart: user.cart });
      return res.redirect('/product');

    }

  })


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


//View cart
ProductRouter.get('/cart', checkUser, async (req, res) => {
  if (!user) {
    const product = req.session.cart;
    return res.render('cart', { product });
  }
  else {
    const products = user.cart;
    let listProduct = [];
    for (let i = 0; i < products.length; i++) {
      let size = products[i].size;
      const product = await ProductRepository.getProductByID(products[i].productID);
      let price = product.price;


      if (size == 'M') {
        price += 20 / 100 * price;
      }
      listProduct.unshift({ product, size, price });
    }

    return res.render('cart', { listProduct });


  }
})



module.exports = ProductRouter;