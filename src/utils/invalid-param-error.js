module.exports = class InvalidParamError extends Error {
  constructor (paramName) {
    super()
    this.mensagem = `Parâmetro inválido: ${paramName}`
  }
}
