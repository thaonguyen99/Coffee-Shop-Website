const express = require('express');
const ProductRouter = express.Router();
const ProductRepository = require('./repository');
const UserRepository = require('../Users/repository');
const checkUser = require('../config/middleware/checkUser');
const { upload } = require('../config/middleware/multer');
const { listIndexes } = require('./model');
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

      return res.redirect('/login');
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
        user.cart.unshift({ productID, size, total: product.price, amount: 1 });
      }

      user = await UserRepository.updateUser(user._id, { cart: user.cart });
      return res.redirect('/product');

    }

  })




//View cart
ProductRouter.route('/cart')
  .get(checkUser, async (req, res) => {
    if (!user) {
      const product = req.session.cart;
      return res.redirect('/login');
    }
    else {
      const products = user.cart;
      let listProduct = [];
      let totalPrice = 0;
      let numberOfItems = 0;
      for (let i = 0; i < products.length; i++) {
        const amount = products[i].amount;
        const product = await ProductRepository.getProductByID(products[i].productID);
        numberOfItems += amount;
        totalPrice += amount * product.price;
        listProduct.unshift({ product, amount });
      }
      const data = { listProduct, totalPrice, numberOfItems };


      return res.render('cart', { data, user });
    }



  })
  //Delete cart
  .patch(checkUser, async (req, res) => {
    console.log('1');
    user.cart = [];
    await UserRepository.updateUser(user._id, { cart: user.cart });
    return res.redirect('/cart');
  })
  //Update quantity & price
  .put(checkUser, async (req, res) => {
    const { amount, productID } = req.query;
    const product = await ProductRepository.getProductByID(productID);

    let totalPrice = 0;
    for (let i = 0; i < user.cart.length; i++) {
      if (user.cart[i].productID == productID) {
        totalPrice += amount * product.price;
        user.cart[i].total = amount * product.price;
        user.cart[i].amount = amount;
      } else {
        totalPrice += user.cart[i].total;
      }
    }

    await UserRepository.updateUser(user._id, { cart: user.cart });
    return res.end(JSON.stringify(totalPrice));
  })

  //Delete item in cart
  .post(checkUser, async (req, res) => {
    const { productID } = req.query;
    const product = await ProductRepository.getProductByID(productID);
    let totalPrice = 0;
    let deleted = 0;
    for (let i = user.cart.length - 1; i >= 0; i--) {
      totalPrice += user.cart[i].total;
      if (user.cart[i].productID === productID) {
        deleted = user.cart[i].total;
        user.cart.splice(i, 1);
      }
    };
    totalPrice = totalPrice - deleted;
    await UserRepository.updateUser(user._id, { cart: user.cart });

    return res.end(JSON.stringify(totalPrice));
  })

//Admin route
ProductRouter.route('/admin')
  .get(async (req, res) => {
    const products = await ProductRepository.getAllProducts();

    return res.render('admin', { products });
  })
  .post(async (req, res) => {

  })


//Add products
ProductRouter.route('/admin/add-product')
  .get((req, res) => {
    return res.render('add-product');
  })
  .post(upload.single('photo'), async (req, res) => {
    const { name, category, description, price } = req.body;
    const photo = 'https://beanie-beanie.herokuapp.com/img/' + req.file.filename;
    const newProduct = { name, category, description, price, photo };

    const product = await ProductRepository.createProduct(newProduct);
    console.log(product);
    return res.redirect('/admin');
  }
  );
module.exports = ProductRouter;