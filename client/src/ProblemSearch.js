import React, { Component } from 'react';
import Problem from './Problem'
import Client from './Client'

export default class ProblemSearch extends Component {

  state = {
    problems: [],
    searchValue: ''
  };

  handleSearchChange = e => {
    const value = e.target.value;
    this.setState({
      searchValue: value
    });

    if (value === '') {
      this.setState({
        problems: []
      })
    } else {
      Client.search(value, problems => {
        console.log(problems)
        this.setState({
          problems: problems
        })
      })
    }
  }

  handleSearchCancel = () => {

  }

  render() {
    return (
      <div className="ProblemSearch">
        <input
          className="prompt"
          type="text"
          placeholder="Search here..."
          value={this.state.searchValue}
          onChange={this.handleSearchChange}
        />
        {
          this.state.problems.map((problem, idx) => (
            <Problem key={idx} problem={problem}/>
          ))
        }
      </div>
    )
  }

}