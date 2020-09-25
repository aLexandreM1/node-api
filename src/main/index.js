const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({ Response: 'OK' })
})

app.use(express.json())

require('../presentation/routers/user-route')(app)

app.listen(6767)
