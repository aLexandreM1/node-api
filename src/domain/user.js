const mongoose = require('../infra/repository/repository')
const bcrypt = require('bcrypt')

const UserSchema = new mongoose.Schema({
  nome: {
    type: String,
    require: true,
    lowercase: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  senha: {
    type: String,
    required: true
  },
  telefones: [{
    numero: { type: String, required: true },
    ddd: { type: String, required: true }
  }],
  data_criacao:
  {
    type: Date,
    default: Date.now
  },
  data_atualizacao:
  {
    type: Date,
    default: Date.now
  },
  ultimo_login:
  {
    type: Date,
    default: Date.now
  },
  token:
  {
    type: String,
    default: null
  }
})

UserSchema.pre('save', async function (next) {
  if (!this.isModified('senha')) return next()

  this.senha = await bcrypt.hash(this.senha, 10)
  return next()
})

const User = mongoose.model('User', UserSchema)

module.exports = User
