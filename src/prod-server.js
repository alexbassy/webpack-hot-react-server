import path from 'path'
import express from 'express'
import serverRenderer from './server/server.js'

function startProductionServer(app, port = 3000) {
  const CLIENT_ASSETS_DIR = path.resolve(__dirname, 'client')
  app.use(express.static(CLIENT_ASSETS_DIR))
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

export default startProductionServer
