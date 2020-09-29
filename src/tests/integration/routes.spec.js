const request = require('supertest')
const app = require('../../main/app')

describe('route tests', () => {
  test('Should return 200 when get /', (done) => {
    request(app)
      .get('/')
      .expect(200, done)
  })

  test('Should return 404 when post /', (done) => {
    request(app)
      .post('/')
      .expect(404, done)
  })

  test('Should return 400 when /sign-in with no password', (done) => {
    request(app)
      .post('/sign-in')
      .send({ email: 'email' })
      .expect(400, done)
  })

  test('Should return 400 when /sign-in with no user', (done) => {
    request(app)
      .post('/sign-in')
      .send({ senha: 'senha' })
      .expect(400, done)
  })

  // test('Should return 401 when /sign-in with invalid user/password', (done) => {
  //   request(app)
  //     .post('/sign-in')
  //     .send({ email: 'invalid_email@mail.com', senha: 'invalid_password' })
  //     .expect(401, done)
  // })
  // mock userRepository
})
