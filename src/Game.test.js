import React from 'react'
import ReactDOM from 'react-dom'
import Oreo from './Game'

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(<Oreo />, div)
  ReactDOM.unmountComponentAtNode(div)
})
