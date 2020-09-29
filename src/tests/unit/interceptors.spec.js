const Interceptor = require('../../middlewares/interceptors')
const interceptor = new Interceptor()

describe('Interceptors', () => {
  test('Should return false when phones array has no ddd', () => {
    const sut = interceptor
    const phones = [{ numero: '1111' }]
    expect(sut.phoneCheck(phones)).toBe(false)
  })

  test('Should return false when phones array has no number', () => {
    const sut = interceptor
    const phones = [{ ddd: '11' }]
    expect(sut.phoneCheck(phones)).toBe(false)
  })

  test('Should return false when phones array has incorrect number', () => {
    const sut = interceptor
    const phones = [{ numero: '12345678', ddd: '11' }]
    expect(sut.phoneCheck(phones)).toBe(false)
  })

  test('Should return false when phones array has incorrect ddd', () => {
    const sut = interceptor
    const phones = [{ numero: '12345678', ddd: '0' }]
    expect(sut.phoneCheck(phones)).toBe(false)
  })

  test('Should return null when no bearerHeader has given', () => {
    const sut = interceptor
    const bearerHeader = null
    expect(sut.getBearerToken(bearerHeader)).toBeNull()
  })

  test('Should return null when bearerHeader has given incorrect', () => {
    const sut = interceptor
    const bearerHeader = 'Bearer'
    expect(sut.getBearerToken(bearerHeader)).toBeNull()
  })

  test('Should return token when bearerHeader is correct', () => {
    const sut = interceptor
    const bearerHeader = 'Bearer token'
    expect(sut.getBearerToken(bearerHeader)).toBe('token')
  })
})
