const webpack = require('webpack')
// const progress = require('cli-progress')
const config = require('../webpack.config.js')
// const webpackDevMiddleware = require('webpack-dev-middleware')
// const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackHotServerMiddleware = require('./dev-hot-middleware')
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
    require('webpack-dev-middleware')(compiler, {
      logLevel: 'warn',
      serverSideRender: true,
      publicPath: config[0].output.publicPath,
    })
  )

  // Step 3: Attach the hot middleware to the compiler & the server
  app.use(
    require('webpack-hot-middleware')(compiler, {
      log: console.log,
      path: '/__webpack_hmr',
      heartbeat: 10 * 1000,
    })
  )

  app.get(
    '/',
    webpackHotServerMiddleware(compiler, {
      serverRendererOptions: {
        mode: 'development',
      },
    })
  )

  app.use(function(req, res, next) {
    res.status(404).send("Sorry can't find that!")
  })

  app.listen(port, () => {
    console.log(`Swimming on http://localhost:/${port}`)
  })
}

module.exports = startDevelopmentServer
