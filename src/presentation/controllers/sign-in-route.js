require('dotenv').config()
const User = require('../../domain/user')
const bcrypt = require('bcrypt')
const InvalidParamError = require('../../utils/invalid-param-error')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator')
const validator = new Validator()

const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }

class SignIn {
  async verifyUser (req, res) {
    let { email, senha, token } = req.body
    validator.validateEmail(res, email)
    validator.validatePassword(res, senha)
    const find = { email }

    try {
      const validUser = await User.findOne(find).exec()
      if (!validUser || !await bcrypt.compare(senha, validUser.senha)) {
        return res.status(401).json(new InvalidParamError('Usuário e/ou senha Inválidos'))
      }
      senha = validUser.senha
      token = jwt.sign({ email, senha }, process.env.ACCESS_TOKEN_SECRET)
      const updatedUser = await User.findOneAndUpdate(find,
        {
          token: token,
          data_atualizacao: Date.now(),
          ultimo_login: Date.now()
        },
        {
          new: true,
          projection
        })
      return res.status(200).json(updatedUser)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SignIn
