require('dotenv').config()
const AlreadyExistsError = require('../../utils/already-exists-error')
const InvalidParamError = require('../../utils/invalid-param-error')
const InternalServerError = require('../../utils/internal-server-error')
const UserRepository = require('../../infra/repository/user-repository')
const userRepository = new UserRepository()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }

class Auth {
  async signIn (req, res) {
    let { email, senha, token } = req.body
    const find = { email }

    try {
      const user = await userRepository.findOne(find)
      if (!user || !await bcrypt.compare(senha, user.senha)) {
        return res.status(401).json(new InvalidParamError('Usuário e/ou senha inválidos'))
      }
      token = jwt.sign({ email }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: 1800 })
      const updatedUser = await userRepository.findOneAndUpdate(find,
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
      return res.status(500).json(new InternalServerError())
    }
  }

  async signUp (req, res) {
    const { email } = req.body
    try {
      const user = await userRepository.findOne({ email: email })
      if (user) {
        return res.status(409).json(new AlreadyExistsError(email))
      }
      const newUser = await userRepository.create({
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
      return res.status(500).json(new InternalServerError())
    }
  }
}

module.exports = Auth
