const express = require('express');
const UserRouter = express.Router();
const UserRepository = require('./repository');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');



//Sign up
UserRouter.route('/register')
  .get(async (req, res) => {
    return res.render('register', { success: true });
  })
  .post([
    check('fullname', 'Full name is required!').not().isEmpty(),
    check('username', 'Username is required!').not().isEmpty(),
    check('address', 'Address is required!').not().isEmpty(),
    check('phoneNumber', 'Phone number must have 10 number').not().isEmpty().isNumeric().isLength(10),
    check('email', 'Email is required!').not().isEmpty().isEmail(),
    check('password', 'Password is required and must have more than 6 characters!').not().isEmpty().isLength({ min: 6 })
  ],
    async (req, res) => {
      const { fullname, username, address, phoneNumber, email, password } = req.body;
      const newUser = req.body;
      const errors = validationResult(req);
      const existUser = await UserRepository.findUserByUsername(username);
      const err = errors.array();
      let msg;
      err.forEach(function (err) {
        msg = err.msg;
      });

      if (!errors.isEmpty()) {
        return res.status(400).render('register', {
          msg, success: false
        });
      }

      try {
        //check user exist
        if (existUser) {
          return res.status(400).render('register', { msg: 'User already exists', success: false })
        }
        console.log('1');
        const user = await UserRepository.create(newUser);
        console.log('2');
        //Encrypt password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        // //return jsonwebtoken
        // const payload = {
        //   user: {
        //     id: user.id
        //   }
        // }

        // jwt.sign(payload,
        //   process.env.jwtSecret,
        //   { expiresIn: 360000 },
        //   (err, token) => {
        //     if (err) throw err;
        //     res.json({ token });
        //   })
        return res.render('homepage', { user });
      }
      catch (e) {
        return res.json({ msg: e });
      }

    });


UserRouter.route('/login')
  .get(async (req, res) => {
    return res.render('login');
  })
  .post(async (req, res) => {
    const { username, password } = req.body;
    const userExist = await UserRepository.findUserByUsername(username);
    if (!userExist) {
      return res.render('login', { msg: 'User not exist' });
    }
    if (password !== userExist.password) {
      return res.render('login', { msg: 'Password is not match' });
    }


    return res.redirect('/');
  });

const sendTokenResponse = (user, res) => {
  //Create token
  const token = user.getSignedJwtToken();


  return res.json({ token }).state('token', { token, firstvisit: false });
}


module.exports = UserRouter;