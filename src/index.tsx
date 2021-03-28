import React from 'react'
import ReactDOM from 'react-dom'
//REACT ROUTER
import {Router} from 'react-router-dom'
import {createBrowserHistory} from 'history'
const history = createBrowserHistory()

import "./styles/general.scss"
import StarwarsView from './views/StarWars'

const App = () =>
  <Router history={history}>
    <StarwarsView/>
  </Router>

if (module.hot) {
  module.hot.accept();
}

ReactDOM.render(<App />, document.getElementById('root'))