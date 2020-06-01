const Product = require('./model');

const getAllProducts = async () => {
  return await Product.find();
}

const getProductByCategory = async (category) => {
  return await Product.findOne({ category });
}

module.exports = {
  getAllProducts,
  getProductByCategory
}
