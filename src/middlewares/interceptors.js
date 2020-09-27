const MissingParamError = require('../utils/missing-param-error')

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

  validateUserToken (req, res, next) {
    const brearerHeader = req.headers.authorization
    if (typeof brearerHeader !== 'undefined') {
      const bearer = brearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      res.status(401).json(new Error('Unauthorized!'))
    }
  }
}

module.exports = Validator
