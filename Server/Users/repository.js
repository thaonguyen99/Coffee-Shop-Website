const User = require('./model');

const create = (username, password) => {
  const user = await User.create(username, password);
  return user;
}

const findUserById = (id) => {
  const user = await User.findById(id);
  return user;
}

const updateUser = (id, user) => {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true });
}

module.exports = {
  create,
  findUserById,
  updateUser
}