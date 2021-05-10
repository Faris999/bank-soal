import React, { Component, PureComponent } from 'react';
import Problem from './Problem'
import Client from './Client'

export default class ProblemSearch extends PureComponent {

  state = {
    problems: [],
    prevQuery: ''
  };
  
  componentDidUpdate() {
    console.log('componentDidUpdate')
    console.log(this.props)
    if (this.props.query !== this.state.prevQuery) {
      Client.search(this.props.query, problems => {
        console.log(problems)
        this.setState({
          problems: problems,
          prevQuery: this.props.query
        })
      })
    }
  }


  render() {
    return (
      <div className="ProblemSearch">
        {
          this.state.problems.map((problem, idx) => (
            <Problem key={idx} problem={problem} />
          ))
        }
      </div>
    )
  }

}