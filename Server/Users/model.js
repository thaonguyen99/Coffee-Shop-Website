const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    require: true,
    unique: true
  },
  fullname: {
    type: String,
    require: true
  },
  phoneNumber: {
    type: String,
    max: 11,
    min: 11
  },
  address: String,
  email: {
    type: String
  },
  password: {
    type: String,
    min: 6,
    require: true
  },
  cart: [{
    productID: {
      type: mongoose.Types.ObjectId,
      ref: 'Product'
    },
    amount: {
      default: 1,
      type: Number
    },
    size: String,
    total: Number
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;