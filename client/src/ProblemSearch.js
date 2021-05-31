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
    const query = new URLSearchParams(this.props.location.search).get('q');
    console.log(query)
    Client.search(query, problems => {
      console.log(problems)
      this.setState({
        problems: problems,
        prevQuery: query
      })
    })
  }

  componentDidUpdate() {
    const query = new URLSearchParams(this.props.location.search).get('q');
    console.log(query)
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
    this.props.history.push('/quiz',
      {
        problems: getShuffledArr(
          this.state.problems.map((problem) => (
            { ...problem, answers: getShuffledArr(problem.answers) }
          ))
        )
      }
    );
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

const getShuffledArr = arr => {
  const newArr = arr.slice()
  for (let i = newArr.length - 1; i > 0; i--) {
    const rand = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[rand]] = [newArr[rand], newArr[i]];
  }
  return newArr
};