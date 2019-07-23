import React from 'react'
import ReactDOM from 'react-dom/server'
import App from '../components/App'

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
    <div id="root">${ReactDOM.renderToString(React.createElement(App))}</div>
    <script src="/main.js"></script>
  </body>
  </html>`

  return body
}

function serverRenderer({ clientStats, serverStats, foo }) {
  return (req, res, next) => {
    const body = getBody({ foo })
    res.status(200).send(body)
  }
}

export default serverRenderer
