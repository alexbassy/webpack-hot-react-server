const path = require('path')
const express = require('express')

function startProductionServer(app, port = 3000) {
  const CLIENT_ASSETS_DIR = path.resolve(__dirname, 'js')
  const serverRenderer = require('./server/server.js')
  console.log('CLIENT_ASSETS_DIR', CLIENT_ASSETS_DIR)
  app.use('/js', express.static(CLIENT_ASSETS_DIR))
  app.use(
    serverRenderer({
      serverRendererOptions: {
        mode: 'production'
      }
    })
  )
  app.listen(port, () => {
    console.log(`Swimming on http://localhost:/${port}`)
  })
}

module.exports = startProductionServer
