import React, { Component } from 'react';

import { BrowserRouter as Router, Route } from "react-router-dom";

import Chat from './components/Chat/Chat';
import Join from './components/Join/Join';

class App extends Component {
  render() {
    return (
      <Router>
        <Route path="/" exact component={Join} />
        <Route path="/dircord" component={Chat} />
      </Router>
    );
  }
}

export default App;

