const express = require('express')
const Register = require('../../presentation/routers/user-route')
const router = express.Router()

router.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

router.post('/register', new Register().addUser)

module.exports = router
