require('dotenv').config()
const User = require('../../domain/user')

// const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }
const minProjection = { senha: 0, __v: 0 }

class UserController {
  async findUser (req, res, next) {
    const user = await User.findOne({ __id: req.__id }, minProjection)
    return res.status(200).json({ user })
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
