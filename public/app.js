import React from 'react'
import ReactDOM from 'react-dom'
import Home from './routes/home'

function rerender () {
  ReactDOM.render((
    <Home/>
  ), document.getElementById('app'))
}
window.rerender = rerender
rerender()
