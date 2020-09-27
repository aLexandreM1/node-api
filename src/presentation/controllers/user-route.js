require('dotenv').config()

// const projection = { nome: 0, email: 0, telefones: 0, senha: 0, __v: 0 }

class FindUser {
  async find (req, res, next) {

  }

  async ensureToken (req, res, next) {
    const brearerHeader = req.headers.authorization
    if (typeof brearerHeader !== 'undefined') {
      const bearer = brearerHeader.split(' ')
      const bearerToken = bearer[1]
      req.token = bearerToken
      next()
    } else {
      res.status(401).json(new Error('Unauthorized!'))
    }
  }
}

module.exports = FindUser
