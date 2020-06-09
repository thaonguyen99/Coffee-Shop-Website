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
        user.cart.unshift({ productID, size, total: product.price, amount: 1 });
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
ProductRouter.route('/cart')
  .get(checkUser, async (req, res) => {
    if (!user) {
      const product = req.session.cart;
      return res.render('cart', { product });
    }
    else {
      const products = user.cart;
      let listProduct = [];
      let totalPrice = 0;
      let numberOfItem = 0;

      for (let i = 0; i < products.length; i++) {
        let size = products[i].size;
        const product = await ProductRepository.getProductByID(products[i].productID);
        let price = product.price;
        let amount = products[i].amount;

        if (size == 'M') {
          price += 20 / 100 * price;
        }

        listProduct.unshift({ product, size, price, amount });
        totalPrice += price * amount;
        numberOfItem += amount;
      }


      return res.render('cart', { listProduct, totalPrice, numberOfItem });
    }



  })

  .put(checkUser, async (req, res) => {
    const { amount, size, productID, price } = req.body;
    user.cart = [];
    let totalPrice = 0;

    for (let i = 0; i < amount.length; i++) {
      let quantity = amount[i];
      let productSize = size[i];
      let id = productID[i];
      let subtotal = price[i] * amount[i];
      totalPrice += subtotal;
      let newProduct = { amount: quantity, size: productSize, productID: id, total: subtotal }
      user.cart.unshift(newProduct);
    }
    await UserRepository.updateUser(user._id, { cart: user.cart });
    return res.redirect('/cart');
  })



module.exports = ProductRouter;