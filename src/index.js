const express = require('express')
const bodyParser = require('body-parser')

const app = express()

app.get('/', (req, res) => {
  res.send('OK')
})

app.use(bodyParser.json())

require('./presentation/routers/user-route')(app)

app.listen(6767)
