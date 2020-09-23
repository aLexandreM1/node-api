const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.send('OK')
})

app.listen(6767)

module.exports = express.json()
