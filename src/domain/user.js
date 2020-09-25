const mongoose = require('../infra/repository/user-auth-repository')

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
    required: true,
    select: false
  },
  telefones: [{
    numero: { type: String, required: true },
    ddd: { type: String, required: true }
  }]
})

const User = mongoose.model('User', UserSchema)

module.exports = User
