require('dotenv').config()
const User = require('../../domain/user')
const AlreadyExistisError = require('../../utils/already-exists-error')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator')
const validator = new Validator()

class SignUp {
  async addUser (req, res) {
    let user = null

    const { nome, email, senha, telefones } = req.body
    validator.validateName(res, nome)
    validator.validateEmail(res, email)
    validator.validatePassword(res, senha)
    validator.validatePhone(res, telefones)
    try {
      const validEmail = await User.findOne({ email: email }).exec()
      if (validEmail) {
        return res.status(409).json(new AlreadyExistisError(email))
      }
      user = await User.create({
        ...req.body,
        token: jwt.sign({ email },
          process.env.ACCESS_TOKEN_SECRET)
      })

      return res.status(201).json({
        id: user._id,
        data_criacao: user.data_criacao,
        data_atualizacao: user.data_atualizacao,
        ultimo_login: user.ultimo_login,
        token: user.token
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json(new Error('Internal Server Error'))
    }
  }
}

module.exports = SignUp
