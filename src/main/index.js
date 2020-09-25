const express = require('express')
const routes = require('../main/config/routes')
const app = express()

app.use(express.json())
app.use(routes)

app.listen(6767)
