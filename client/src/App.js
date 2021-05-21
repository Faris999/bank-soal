import 'bootstrap/dist/css/bootstrap.min.css'
import React, { Component, useState } from 'react'
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import ProblemSearch from './ProblemSearch'
import SubmitProblem from './SubmitProblem';
import Quiz from './Quiz';
import Result from './Result'
import Review from './Review'
import './App.css'

class App extends Component {
  render() {
    return (
      <Router className="App">
        <div className="container">

          <Route path="/" component={NavBar}></Route>
          <Route path="/search" render={props => <ProblemSearch {...props} />}></Route>
          <Route path="/submit" component={SubmitProblem}></Route>
          <Route path="/quiz" component={Quiz}></Route>
          <Route path="/result" component={Result}></Route>
          <Route path="/review" component={Review}></Route>
        </div>
      </Router>
    );
  }
}

function NavBar(props) {

  const [query, setQuery] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    props.history.push('/search', {query})
  }

  return (
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
        <form className="d-flex" onSubmit={onSubmit}>
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={query} onChange={e => setQuery(e.target.value)} />
          <button className="btn btn-outline-success" type="submit" onClick={onSubmit}>Search</button>
        </form>
      </div>
    </nav>
  )
}

export default App;
