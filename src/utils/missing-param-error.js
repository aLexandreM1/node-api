module.exports = class MissingParamError extends Error {
  constructor (paramName) {
    super()
    this.mensagem = `Faltando parâmetro: ${paramName}`
  }
}
