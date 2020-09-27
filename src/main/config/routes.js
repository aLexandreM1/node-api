const express = require('express')
const SignUp = require('../../presentation/routers/sign-up-route')
const SignIn = require('../../presentation/routers/sign-in-route')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

router.post('/sign-in', new SignIn().verifyUser)

router.post('/sign-up', new SignUp().addUser)

module.exports = router
