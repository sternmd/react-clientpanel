import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
          <AppNavBar />
          <div className="container">
          <Switch>
            <Route exact path="/" component={Dashboard}></Route>
          </Switch>
          </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
