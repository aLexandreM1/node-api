const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/nodedb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
})

module.exports = mongoose
