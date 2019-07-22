const React = require('react')
const renderToString = require('react-dom/server').renderToString
const App = require('../components/App')

const IS_PRODUCTION = process.env.NODE_ENV === 'production'

const getBody = (options = {}) => {
  let body = `
  <!doctype html>
  <html>
  <head>
    <title>${options.foo}</title>
  </head>
  <body>
    <div class=env>server</div>
    <div id="root">${renderToString(React.createElement(App))}</div>
    <script src="/js/main.js"></script>
  </body>
  </html>`

  return body
}

module.exports = function serverRenderer({ clientStats, serverStats, foo }) {
  return (req, res, next) => {
    const body = getBody({ foo })
    res.status(200).send(body)
  }
}
