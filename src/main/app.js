const express = require('express')
const mongoose = require('mongoose')
const routes = require('./config/routes')

const app = express()

mongoose.connect('mongodb://localhost/nodedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false

})

app.use(express.json())
app.use(routes)

module.exports = app
