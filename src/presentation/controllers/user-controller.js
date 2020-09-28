require('dotenv').config()
const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')

// const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }
const minProjection = { senha: 0, __v: 0 }

class UserController {
  async findUser (req, res, next) {
    try {
      // REMOVER ESSE REGEX DAQUI
      if (req.params.id.length < 24) {
        return res.status(400).json(new InvalidParamError('id'))
      }
      const user = await User.findById(req.params.id, minProjection)
      if (!user) {
        return res.status(404).json(new Error('Not Found'))
      }
      return res.status(200).json({ user })
    } catch (err) {
      console.log(err)
      return res.status(500).json(new Error('Internal Server Error'))
    }
  }

  // async ensureToken (req, res, next) {
  //   const brearerHeader = req.headers.authorization
  //   if (typeof brearerHeader !== 'undefined') {
  //     const bearer = brearerHeader.split(' ')
  //     const bearerToken = bearer[1]
  //     req.token = bearerToken
  //     next()
  //   } else {
  //     res.status(401).json(new Error('Unauthorized!'))
  //   }
  // }
}

module.exports = UserController
