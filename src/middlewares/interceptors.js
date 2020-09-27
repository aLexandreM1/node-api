const MissingParamError = require('../utils/missing-param-error')
const InvalidSessionError = require('../utils/invalid-session-error')
const User = require('../domain/user')
const jwt = require('jsonwebtoken')

class Validator {
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

  validatePhone (req, res, next) {
    const { telefones } = req.body
    let missingNumber = null
    let missingDdd = null

    if (telefones.length === 0) {
      return res.status(400).json(new MissingParamError('telefones'))
    }
    telefones.forEach(telefone => {
      if (!telefone.numero) {
        missingNumber = true
      }
      if (!telefone.ddd) {
        missingDdd = true
      }
    })
    if (missingDdd) {
      return res.status(400).json(new MissingParamError('telefones sem número'))
    }
    if (missingNumber) {
      return res.status(400).json(new MissingParamError('telefones sem ddd'))
    }
    next()
  }

  async validateUserToken (req, res, next) {
    const brearerHeader = req.headers.authorization
    if (brearerHeader !== undefined) {
      const bearer = brearerHeader.split(' ')
      const bearerToken = bearer[1]
      try {
        const verify = jwt.verify(bearerToken, process.env.ACCESS_TOKEN_SECRET)
        const user = await User.findOne({ email: verify.email })
        if (user.token === bearerToken) {
          next()
        }
      } catch (err) {
        if (err.name === 'TokenExpiredError') {
          return res.status(401).json(new InvalidSessionError(bearerToken))
        }
        console.log(err)
        next()
      }
    }
  }
}

module.exports = Validator
