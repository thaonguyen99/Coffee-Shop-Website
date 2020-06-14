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

const updateProduct = async (id, newcount) => {
  return await Product.findByIdAndUpdate(id, { $set: { sellcount: newcount } }, { useFindandModified: false, new: true });
}

const getBestSeller = async () => {
  return await Product.find().sort({ sellcount: -1 }).limit(5);
}

module.exports = {
  getAllProducts,
  getProductByCategory,
  createProduct,
  getProductByID,
  updateProduct,
  getBestSeller
}
