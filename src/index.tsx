import React from 'react'
import ReactDOM from 'react-dom'

import "./styles/general.scss"
import StarwarsView from './views/StarWars'

const App = () => 
  <StarwarsView/>

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'))