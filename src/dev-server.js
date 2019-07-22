const webpack = require('webpack')
// const progress = require('cli-progress')
const config = require('../webpack.config.js')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotServerMiddleware = require('webpack-hot-server-middleware')
// const ProgressPlugin = require('webpack/lib/ProgressPlugin')

function startDevelopmentServer(app, port = 3000) {
  const compiler = webpack(config)

  // const progressBar = new progress.Bar({}, progress.Presets.shades_classic)

  // compiler.compilers[0].hooks.beforeRun.tap('Progress', async () => {
  //   console.log(`=== beforeRun ===`)
  //   progressBar.start(100, 0)
  // })

  // compiler.hooks.done.tap('Progress', () => {
  //   console.log(`=== done ===`)
  //   progressBar.stop()
  // })

  // compiler.apply(
  //   new ProgressPlugin((percentage, msg) => {
  //     console.log(percentage)
  //     progressBar.update(Math.floor(percentage * 100))
  //   })
  // )

  app.use(
    webpackDevMiddleware(compiler, {
      noInfo: true
    })
  )

  app.use(
    webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        mode: 'development'
      }
    })
  )

  app.listen(port, () => {
    console.log(`Swimming on http://localhost:/${port}`)
  })
}

module.exports = startDevelopmentServer
