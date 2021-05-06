import React, { Component } from 'react'
import logo from './logo.svg';
import ProblemSearch from './ProblemSearch'
import './App.css';
import SubmitProblem from './SubmitProblem';

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="ui text container">
          <ProblemSearch />
          <br/>
          <SubmitProblem />
        </div>
      </div>
    );
  }
}

export default App;
