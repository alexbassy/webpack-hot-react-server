const express = require('express')
const app = express()

if (process.env.NODE_ENV === 'production') {
  require('./prod-server')(app)
} else {
  require('./dev-server')(app)
}
