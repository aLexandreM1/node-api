const express = require('express')
const UserController = require('../../presentation/controllers/user-controller')
const Auth = require('../../presentation/controllers/auth')
const Valitador = require('../../middlewares/interceptors')
const router = express.Router()
const validator = new Valitador()
const userController = new UserController()
const auth = new Auth()

router.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

router.post('/sign-in',
  validator.validateEmail,
  validator.validatePassword,
  auth.signIn)

router.post('/sign-up',
  validator.validateName,
  validator.validateEmail,
  validator.validatePassword,
  validator.validatePhone,
  auth.signUp)

router.get('/find/:id',
  validator.validateUserToken,
  userController.findUser)

module.exports = router
