const express = require('express')
const app = express()

if (process.env.NODE_ENV === 'production') {
  const server = require('./prod-server').default
  server(app)
} else {
  require('./dev-server')(app)
}
