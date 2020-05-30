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
    type: mongoose.Types.ObjectId,
    ref: 'Cart'
  }]
});

const User = mongoose.model('User', UserSchema);

module.exports = User;