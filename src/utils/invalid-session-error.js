module.exports = class InvalidSessionError extends Error {
  constructor (paramName) {
    super()
    this.mensagem = `Sessão Inválida: ${paramName}`
  }
}
