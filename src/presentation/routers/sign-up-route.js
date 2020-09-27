const User = require('../../domain/user')
const InvalidParamError = require('../../utils/invalid-param-error')
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
      if (!validEmail) {
        user = await User.create(req.body)
      } else {
        return res.status(409).json(new InvalidParamError(email))
      }

      return res.status(201).json(user)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = SignUp
