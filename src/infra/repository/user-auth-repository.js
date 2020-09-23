const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

module.exports = mongoose
