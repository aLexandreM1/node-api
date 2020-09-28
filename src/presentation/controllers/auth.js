require('dotenv').config()
const AlreadyExistisError = require('../../utils/already-exists-error')
const InvalidParamError = require('../../utils/invalid-param-error')
const User = require('../../domain/user')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }

class Auth {
  async signIn (req, res) {
    let { email, senha, token } = req.body
    const find = { email }

    try {
      const user = await User.findOne(find).exec()
      if (!user || !await bcrypt.compare(senha, user.senha)) {
        return res.status(401).json(new InvalidParamError('Usuário e/ou senha inválidos'))
      }
      senha = user.senha
      token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1800 })
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
      return res.status(500).json(new Error('Internal Server Error'))
    }
  }

  async signUp (req, res) {
    const { email } = req.body
    try {
      const user = await User.findOne({ email: email }).exec()
      if (user) {
        return res.status(409).json(new AlreadyExistisError(email))
      }
      const newUser = await User.create({
        ...req.body,
        token: jwt.sign({ email },
          process.env.ACCESS_TOKEN_SECRET)
      })

      return res.status(201).json({
        id: newUser._id,
        data_criacao: newUser.data_criacao,
        data_atualizacao: newUser.data_atualizacao,
        ultimo_login: newUser.ultimo_login,
        token: newUser.token
      })
    } catch (err) {
      console.log(err)
      return res.status(500).json(new Error('Internal Server Error'))
    }
  }
}

module.exports = Auth
