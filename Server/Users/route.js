const express = require('express');
const UserRouter = express.Router();
const UserRepository = require('./repository');
const { check, validationResult } = require('express-validator');



//Sign up
UserRouter.route('/register')
  .get(async (req, res) => {
    return res.render('register');
  })
  .post([
    check('fullname').not().isEmpty().withMessage('Full name is required!'),
    check('username').not().isEmpty().withMessage('Username is required!'),
    check('address').not().isEmpty().withMessage('Address is required!'),
    check('phoneNumber').not().isEmpty().isNumeric().isLength(10).withMessage('Phone number must have 10 number'),
    check('email').not().isEmpty().isEmail().withMessage('Email is required!'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('Password is required!')
  ],
    async (req, res) => {
      const { fullName, username, address, phoneNumber, email, password } = req.body;
      const errors = validationResult(req);
      const existUser = await UserRepository.findUserByUsername(username);

      if (existUser) {
        return res.render('register', { msg: 'User exist' });
      }


      if (!errors.isEmpty()) {
        return res.status(400).render('register', { errors });
      }



      await UserRepository.create(req.body);
      return res.redirect('/homepage');
    });


UserRouter.route('/login')
  .get(async (req, res) => {
    return res.render('login');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    const userExist = await UserRepository.findUserByUsername(username);
    if (userExist) {
      return res.render('login', { msg: 'User exist' });
    }
    return res.redirect('homepage');
  })


module.exports = UserRouter;