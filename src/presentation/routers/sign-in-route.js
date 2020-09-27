require('dotenv').config()
const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator')
const validator = new Validator()

class SignIn {
  async verifyUser (req, res) {
    let { email, senha, token } = req.body

    validator.validateEmail(res, email)
    validator.validatePassword(res, senha)

    try {
      const validUser = await User.findOne({ email: email }).exec()
      if (!validUser) {
        return res.status(401).json()
      }
      if (await bcrypt.compare(senha, validUser.senha)) {
        senha = validUser.senha
      } else {
        return res.status(401).json()
      }
      token = jwt.sign({ email, senha }, process.env.ACCESS_TOKEN_SECRET)
      await validUser.updateOne({ token: token, data_atualizacao: Date.now(), ultimo_login: Date.now() })
      validUser.save()
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SignIn
