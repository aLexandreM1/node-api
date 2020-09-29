const express = require('express')
const UserController = require('../../presentation/controllers/user-controller')
const Auth = require('../../presentation/controllers/auth')
const Interceptor = require('../../middlewares/interceptors')
const router = express.Router()
const interceptor = new Interceptor()
const userController = new UserController()
const auth = new Auth()

router.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

router.post('/sign-in',
  interceptor.validateEmail,
  interceptor.validatePassword,
  auth.signIn)

router.post('/sign-up',
  interceptor.validateName,
  interceptor.validateEmail,
  interceptor.validatePassword,
  interceptor.validatePhone,
  auth.signUp)

router.get('/find/:id',
  interceptor.validateUserToken,
  userController.findUser)

module.exports = router
