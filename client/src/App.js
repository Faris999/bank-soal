import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ProblemSearch from './ProblemSearch'
import SubmitProblem from './SubmitProblem';

class App extends Component {

  state = {
    query: '',
    queryToSend: ''
  }

  onChange = e => {
    this.setState({
      query: e.target.value
    });
  }

  onSubmit = e => {
    e.preventDefault()
    this.setState(state => ({queryToSend: state.query}))
  }

  render() {
    return (
      <Router className="App">
        <div className="container">
          <nav className="navbar navbar-expand navbar-light bg-light">
            <NavLink to="/" className="navbar-brand">Bank Soal</NavLink>
            <div className="collapse navbar-collapse">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="navbar-item">
                  <NavLink to="/" className="nav-link" exact>Home</NavLink>
                </li>
                <li className="navbar-item">
                  <NavLink to="/submit" className="nav-link">Submit Problem</NavLink>
                </li>
              </ul>
              <form className="d-flex" onSubmit={this.onSubmit}>
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={this.state.query} onChange={this.onChange}/>
                <button className="btn btn-outline-success" type="submit" onClick={this.onSubmit}>Search</button>
              </form>
            </div>
          </nav>

          <Route path="/" exact render={() => <ProblemSearch query={this.state.queryToSend}/>}></Route>
          <Route path="/submit" component={SubmitProblem}></Route>
        </div>
      </Router>
    );
  }
}

export default App;
