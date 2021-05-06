import React, { Component } from 'react';

export default class SubmitProblem extends Component {

  state = {
    question: '',
    answers: ['a', 'b', 'c', 'd'],
    tags: []
  }

  handleSubmit = e => {
    e.preventDefault();
    fetch()
  }

  handleInputChange = e => {
    const target = e.target;
    const {value, name} = target;

    switch(name) {
      case "question":
        break;
      case "numAnswer":
        break;
      default:
        break;
    }
    this.setState({
      [name]: value
    })
  }

  render() {
    return (
      <div className="SubmitProblem">
        <form onSubmit={this.handleSubmit}>
          <label></label>
          <input name="question" placeholder="Question" value={this.state.question} onChange={this.handleInputChange}></input>
          <br/>
          <input name="numAnswer" placeholder="Num answers" value={this.state.answers.length}onChange={this.handleInputChange}></input>
          {
            this.state.answers.map((answer, idx) => (
              <div>
              <input value={answer} key={idx} onChange={this.handleInputChange}></input>
              <br/>
              </div>
            ))
          }
          <button type="Submit">Submit</button>
        </form>
      </div>
    )
  }

}