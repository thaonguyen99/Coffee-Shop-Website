const Product = require('./model');

const getAllProducts = async () => {
  return await Product.find();
}

const getProductByCategory = async (category) => {
  return await Product.find({ category });
}

const getProductByID = async (id) => {
  return await Product.findById(id);
}

const createProduct = async (product) => {
  return await Product.create(product);
}

module.exports = {
  getAllProducts,
  getProductByCategory,
  createProduct,
  getProductByID
}
