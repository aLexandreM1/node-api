require('dotenv').config()
const User = require('../../domain/user')
const AlreadyExistisError = require('../../utils/already-exists-error')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Validator = require('../../utils/validator')
const validator = new Validator()

class SignUp {
  async addUser (req, res) {
    let user = null
    req.body.senha = await bcrypt.hash(req.body.senha, 10)

    const { nome, email, senha, telefones } = req.body
    validator.validateName(res, nome)
    validator.validateEmail(res, email)
    validator.validatePassword(res, senha)
    validator.validatePhone(res, telefones)
    try {
      const validEmail = await User.findOne({ email: email }).exec()
      if (!validEmail) {
        req.body.token = jwt.sign({ email, senha }, process.env.ACCESS_TOKEN_SECRET)
        user = await User.create(req.body)
      } else {
        return res.status(409).json(new AlreadyExistisError(email))
      }

      return res.status(201).json({ user })
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SignUp
