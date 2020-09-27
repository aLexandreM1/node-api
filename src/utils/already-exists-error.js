module.exports = class AlreadyExistisError extends Error {
  constructor (paramName) {
    super()
    this.mensagem = `E-mail já existente: ${paramName}`
  }
}
