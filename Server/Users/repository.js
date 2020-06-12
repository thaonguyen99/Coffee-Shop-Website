const User = require('./model');

const create = async (user) => {

  return await User.create(user);;
}

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
}

const findUserByUsername = async (name) => {
  const user = await User.findOne({ username: name });
  return user;
}

const updateUser = async (id, user) => {
  const newUser = await User.findByIdAndUpdate(id, user, { new: true, useFindAndModify: false });
  return newUser;
}






module.exports = {
  create,
  findUserById,
  updateUser,
  findUserByUsername
}