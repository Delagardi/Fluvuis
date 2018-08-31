import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

import Login from './components/login';
import Events from './components/events';

class App extends Component {
  render() {
    return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Route exact path="/" component={Login} />
          <Route exact path="/events" component={Events} />
        </div>
      </Router>
    </Provider>
    );
  }
}

export default App;
