module.exports = class InternalServerError extends Error {
  constructor () {
    super()
    this.mensagem = 'Internal Server error'
  }
}
