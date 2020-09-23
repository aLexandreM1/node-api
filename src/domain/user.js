const mongoose = require('../infra/repository/user-auth-repository')

const UserSchema = new mongoose.Schema({
  name: {
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
  password: {
    type: String,
    required: true,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = mongoose.model('User', UserSchema)

module.exports = User
