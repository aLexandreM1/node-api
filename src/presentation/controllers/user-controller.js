const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')
const InternalServerError = require('../../utils/internal-server-error')

const projection = { senha: 0, __v: 0 }

class UserController {
  async findUser (req, res, next) {
    try {
      if (req.params.id.length < 24) {
        return res.status(400).json(new InvalidParamError('id'))
      }
      const user = await User.findById(req.params.id, projection)
      if (!user) {
        return res.status(404).json({ mensagem: 'Not Found' })
      }
      return res.status(200).json({ user })
    } catch (err) {
      console.log(err)
      return res.status(500).json(new InternalServerError('Internal Server Error'))
    }
  }
}

module.exports = UserController
