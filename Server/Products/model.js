const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
  name: {
    type: String,
    require: true
  },
  category: {
    type: String,
    enum: [
      'Coffee',
      'Tea',
      'Pastry'
    ]
  },
  description: String,
  price: Number,
  size: {
    type: String,
    enum: [
      'S',
      'M',
      'L'
    ]
  },
  photo: {
    type: String,
    require: true
  },
  sellcount: {
    type: Number,
    default: 0
  }
});

const Product = mongoose.model('Product', ProductSchema);

module.exports = Product;