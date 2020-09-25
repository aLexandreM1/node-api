const User = require('../../domain/user')

class Register {
  async addUser (req, res) {
    try {
      const user = await User.create(req.body)

      return res.json({ user })
    } catch (err) {
      return res.status(400).json({ error: 'Registration Failed!', err })
    }
  }
}

module.exports = Register
