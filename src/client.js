const React = require('react')
const ReactDOM = require('react-dom')
const App = require('./components/App')

if (__SERVER__) {
  ReactDOM.render(React.createElement(App), document.getElementById('root'))
} else if (__CLIENT__) {
  document.querySelector('.env').textContent = 'client'
  ReactDOM.hydrate(React.createElement(App), document.getElementById('root'))
}
