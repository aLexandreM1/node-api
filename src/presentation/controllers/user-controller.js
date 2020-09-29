const UserRepository = require('../../infra/repository/user-repository')
const InvalidParamError = require('../../utils/invalid-param-error')
const InternalServerError = require('../../utils/internal-server-error')
const mongoose = require('mongoose')
const userRepository = new UserRepository()

const projection = { senha: 0, __v: 0 }

class UserController {
  async findUser (req, res, next) {
    try {
      if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
        return res.status(400).json(new InvalidParamError('id'))
      }
      const user = await userRepository.findById({ id: req.params.id, projection })
      if (!user) {
        return res.status(404).json({ mensagem: 'Não encontrado' })
      }
      return res.status(200).json({ user })
    } catch (err) {
      console.log(err)
      return res.status(500).json(new InternalServerError('Internal Server Error'))
    }
  }
}

module.exports = UserController
