const MissingParamError = require('../utils/missing-param-error')

class Validator {
  validateName (res, name) {
    if (!name) {
      return res.status(400).json(new MissingParamError('nome'))
    }
  }

  validateEmail (res, email) {
    if (!email) {
      return res.status(400).json(new MissingParamError('email'))
    }
  }

  validatePassword (res, senha) {
    if (!senha) {
      return res.status(400).json(new MissingParamError('senha'))
    }
  }

  validatePhone (res, telefones) {
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
  }
}

module.exports = Validator
