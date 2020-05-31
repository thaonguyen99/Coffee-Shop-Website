const Product = require('./model');

const getAllProducts = async () => {
  return await Product.list();
}

const getProductByCategory = async (category) => {
  return await Product.findOne({ category });
}

module.exports = {
  getAllProducts,
  getProductByCategory
}
