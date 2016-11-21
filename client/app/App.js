import React from 'react'
import Landing from './landing'
import Search from './search'
import Layout from './layout'
import { Router, Route, Link, IndexRoute, browserHistory, hashHistory } from 'react-router'
import { store } from './store/store'
import { Provider } from 'react-redux'

const App = () => (
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path='/' component={Layout}>
        <IndexRoute component={Landing} />
        <Route path='/search' component={Search} />
      </Route>
    </Router>
  </Provider>
)

export default App
