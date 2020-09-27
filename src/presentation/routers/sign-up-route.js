const User = require('../../domain/user')
const MissingParamError = require('../../utils/missing-param-error')
const InvalidParamError = require('../../utils/invalid-param-error')

// const users = await User.findOne({ email: email }).exec()
// return res.json({ users })

class SignUp {
  async addUser (req, res) {
    let user = null
    let missingNumber = null
    let missingDdd = null
    try {
      const { nome, email, senha, telefones } = req.body
      if (!nome) {
        return res.status(400).json(new MissingParamError('nome'))
      }
      if (!email) {
        return res.status(400).json(new MissingParamError('email'))
      }
      if (!senha) {
        return res.status(400).json(new MissingParamError('senha'))
      }
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
      const validEmail = await User.findOne({ email: email }).exec()
      if (!validEmail) {
        user = await User.create(req.body)
      } else {
        return res.status(409).json(new InvalidParamError(email))
      }
      return res.status(201).json(user)
    } catch (err) {
      return res.status(400).json({ error: 'Registration Failed!', err })
    }
  }
}

module.exports = SignUp
