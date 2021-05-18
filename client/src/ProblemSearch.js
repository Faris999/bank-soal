import React, { PureComponent } from 'react';
import Problem from './Problem'
import Client from './Client'

export default class ProblemSearch extends PureComponent {

  state = {
    problems: [],
    prevQuery: ''
  };

  componentDidMount() {
    console.log('mount')
    const query = this.props.location.state.query;
    Client.search(query, problems => {
      console.log(problems)
      this.setState({
        problems: problems,
        prevQuery: query
      })
    })
  }
  
  componentDidUpdate() {
    const query = this.props.location.state.query;
    console.log('update')
    if (query !== this.state.prevQuery) {
      Client.search(query, problems => {
        console.log(problems)
        this.setState({
          problems: problems,
          prevQuery: query
        })
      })
    }
  }

  handleClick = () => {
    this.props.history.push('/quiz', {problems: this.state.problems});
  };

  render() {
    return (
      <div className="ProblemSearch">
        <button className="btn btn-primary" onClick={this.handleClick}>Kerjakan</button>
        {
          this.state.problems.map((problem, idx) => (
            <Problem key={idx} problem={problem} />
          ))
        }
      </div>
    )
  }

}