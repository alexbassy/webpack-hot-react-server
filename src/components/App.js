const React = require('react')

module.exports = () =>
  React.createElement(
    'div',
    {
      onClick() {
        window.alert('clicked')
      }
    },
    'Client'
  )

if (module.hot) {
  console.log(`dis module is hawt`)
}
