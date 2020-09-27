const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')

// user = await User.create(req.body)

// const validEmail = await User.findOne({ email: email }).exec()

class RepositoryHelper {
  async createUser (req, res) {
    let user = null
    const validEmail = await User.findOne({ email: email }).exec()
    if (!validEmail) {
      user = await User.create(req.body)
    } else {
      return res.json(new InvalidParamError(email))
    }
    return res.json(user)
  }
}

module.exports = RepositoryHelper
