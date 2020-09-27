require('dotenv').config()
const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator')
const validator = new Validator()

class SignUp {
  async addUser (req, res) {
    let user = null
    // encrypt
    req.body.senha = await bcrypt.hash(req.body.senha, 10)

    const { nome, email, senha, telefones } = req.body
    // validations
    validator.validateName(res, nome)
    validator.validateEmail(res, email)
    validator.validatePassword(res, senha)
    validator.validatePhone(res, telefones)
    // case
    try {
      const validEmail = await User.findOne({ email: email }).exec()
      if (!validEmail) {
        req.body.token = jwt.sign({ email, senha }, process.env.ACCESS_TOKEN_SECRET)
        user = await User.create(req.body)
      } else {
        return res.status(409).json(new InvalidParamError(email))
      }

      return res.status(201).json({ user })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SignUp
