const MissingParamError = require('../utils/missing-param-error')
const InvalidSessionError = require('../utils/invalid-session-error')
const InternalServerError = require('../utils/internal-server-error')
const InvalidParamError = require('../utils/invalid-param-error')
const UserRepository = require('../infra/repository/user-repository')
const userRepository = new UserRepository()
const jwt = require('jsonwebtoken')

class Interceptor {
  constructor () {
    // solve fcking problems with this pointer
    this.validateUserToken = this.validateUserToken.bind(this)
    this.validatePhone = this.validatePhone.bind(this)
  }

  validatePhone (req, res, next) {
    const { telefones } = req.body

    if (telefones.length === 0) {
      return res.status(400).json(new MissingParamError('telefones'))
    }
    if (!this.phoneCheck(telefones)) {
      return res.status(400).json(new MissingParamError('Numero ou DDD faltando'))
    }
    next()
  }

  getBearerToken (bearerHeader) {
    if (!bearerHeader) return null
    const bearer = bearerHeader.split(' ')
    if (bearer.length < 2) return null
    const bearerToken = bearer[1]
    return bearerToken
  }

  validateName (req, res, next) {
    const { nome } = req.body
    if (!nome) {
      return res.status(400).json(new MissingParamError('nome'))
    }
    next()
  }

  validateEmail (req, res, next) {
    const { email } = req.body
    if (!email) {
      return res.status(400).json(new MissingParamError('email'))
    }
    next()
  }

  validatePassword (req, res, next) {
    const { senha } = req.body
    if (!senha) {
      return res.status(400).json(new MissingParamError('senha'))
    }
    next()
  }

  phoneCheck (telefones) {
    return telefones.reduce((acc, cur) => {
      if (!acc) return acc

      if (!cur.ddd || !cur.numero || cur.ddd.length !== 2 || cur.numero.length !== 9) {
        return false
      }
      return acc
    }, true)
  }

  async validateUserToken (req, res, next) {
    const brearerHeader = req.headers.authorization
    const bearerToken = this.getBearerToken(brearerHeader)
    if (!bearerToken) {
      return res.status(401).json({ mensagem: 'Não autorizado' })
    }
    try {
      const verify = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
      const user = await userRepository.findOne({ email: verify.email })
      if (user.token === bearerToken) {
        next()
      }
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        return res.status(401).json(new InvalidSessionError(bearerToken))
      }
      if (err.name === 'JsonWebTokenError') {
        return res.status(400).json(new InvalidParamError('Token'))
      }
      console.log(err)
      return res.status(500).json(new InternalServerError())
    }
  }
}

module.exports = Interceptor
