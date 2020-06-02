const Product = require('./model');

const getAllProducts = async () => {
  return await Product.find();
}

const getProductByCategory = async (category) => {
  return await Product.findOne({ category });
}

const createProduct = async (product) => {
  return await Product.create(product);
}

module.exports = {
  getAllProducts,
  getProductByCategory,
  createProduct
}
