const User = require('../../domain/user')

class UserRepository {
  async create (userModel) {
    return await User.create(userModel)
  }

  async findById ({ id, projection }) {
    return await User.findById(id, projection)
  }

  async findOne ({ email, projection }) {
    return await User.findOne({ email })
  }

  async findOneAndUpdate (find, update, options) {
    return await User.findOneAndUpdate(find, update, options)
  }
}

module.exports = UserRepository
