const express = require('express')
const SignUp = require('../../presentation/routers/sign-up-route')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

router.post('/sign-up', new SignUp().addUser)

module.exports = router
