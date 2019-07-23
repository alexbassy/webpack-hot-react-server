import 'react-hot-loader'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'

if (__SERVER__) {
  ReactDOM.render(React.createElement(App), document.getElementById('root'))
} else if (__CLIENT__) {
  document.querySelector('.env').textContent = 'client'
  ReactDOM.hydrate(React.createElement(App), document.getElementById('root'))
}
