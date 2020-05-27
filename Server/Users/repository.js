const User = require('./model');

const create = async (username, email, fullName, address, phoneNumber, password) => {
  const user = await User.create(username, password, email, fullName, address, phoneNumber);
  return user;
}

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
}

const findUserByUsername = async (username) => {
  const user = await User.findOne(username);
  return user;
}

const updateUser = async (id, user) => {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true });
}

module.exports = {
  create,
  findUserById,
  updateUser,
  findUserByUsername
}