import React, { Component } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'

function Answer({ letter, answer, id, onTextChange, onCorrectChange, onDelete }) {
  const handleChange = e => {
    const text = e.target.value;
    onTextChange(id, text);
  }

  const handleCorrect = e => {
    const isCorrect = !answer.isCorrect;
    onCorrectChange(id, isCorrect);
  }

  const handleDelete = () => {
    onDelete(id)
  }

  return (
    <div className="mb-3 input-group flex-nowrap">
      <span className="input-group-text">{letter}. </span>
      <input type="text" className="form-control" placeholder="Answer" aria-label="Answer" value={answer.answerText} onChange={handleChange} />
      <div className="input-group-text">
        <input className="form-check-input mt-0" type="checkbox" value={answer.isCorrect} onChange={handleCorrect} />
      </div>
      <span className="input-group-text">Is Correct</span>
      {letter !== 'A' &&
        <button className="btn btn-danger" type="button" onClick={handleDelete}>Delete</button>
      }
    </div>
  )
}
export default class SubmitProblem extends Component {

  state = {
    id_increment: 4,
    question: '',
    answers: {
      0: {
        answerText: '',
        isCorrect: false
      }, 1: {
        answerText: '',
        isCorrect: false
      }, 2: {
        answerText: '',
        isCorrect: false
      }, 3: {
        answerText: '',
        isCorrect: false
      }
    },
    tags: [],
    subject: '',
    success: false,
    error: false
  }

  handleSubmit = e => {
    e.preventDefault();
    axios.post('/api/problem', {
      question: this.state.question,
      answers: Object.values(this.state.answers),
      tags: this.state.tags
    }).then(res => console.log(res.data))
      .then(() => {
        this.setState({
          success: true,
          id_increment: 4,
          answers: {
            0: {
              answerText: '',
              isCorrect: false
            }, 1: {
              answerText: '',
              isCorrect: false
            }, 2: {
              answerText: '',
              isCorrect: false
            }, 3: {
              answerText: '',
              isCorrect: false
            }
          }
        }, () => setTimeout(() => this.setState({ success: false }), 3000))
      })
      .catch(err => this.setState({error: err.response.data.message}, () => setTimeout(() => this.setState({ error: false }), 3000)))
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onTextChange = (id, text) => {
    this.setState(state => ({
      answers: {
        ...state.answers,
        [id]: {
          ...state.answers[id],
          answerText: text
        }
      }
    }))
  }

  onCorrectChange = (id, isCorrect) => {
    this.setState(state => ({
      answers: {
        ...state.answers,
        [id]: {
          ...state.answers[id],
          isCorrect: isCorrect
        }
      }
    }))
  }

  onDelete = id => {
    this.setState(state => {
      const oldState = state;
      delete oldState.answers[id]
      return oldState
    })
  }

  addAnswer = () => {
    this.setState(state => ({
      answers: {
        ...state.answers,
        [state.id_increment]: {
          answerText: '',
          isCorrect: false
        }
      },
      id_increment: state.id_increment + 1
    }))
  }

  onTagDelete = i => {
    this.setState(state => {
      const { tags } = state
      return { tags: tags.filter((tag, index) => index !== i) }
    })
  }

  onTagAdd = tag => {
    this.setState(state => ({ tags: [...state.tags, tag] }))
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Question</label>
          <textarea type="text" className="form-control" name="question" value={this.state.question} onChange={this.handleChange} />
        </div>
        {Object.keys(this.state.answers).map((answer, i) => (
          <Answer key={answer}
            id={answer}
            onChange={this.onTextChange}
            letter={String.fromCharCode(65 + i)}
            answer={this.state.answers[answer]}
            onTextChange={this.onTextChange}
            onCorrectChange={this.onCorrectChange}
            onDelete={this.onDelete} />
        ))}

        <div className="mb-3">
          <label className="form-label">Subject</label>
          <input type="text" className="form-control" name="subject" value={this.state.subject} onChange={this.handleChange} />
        </div>

        <button type="button" className="btn btn-secondary me-3" onClick={this.addAnswer}>Add Answer</button>
        <button type="submit" className="btn btn-primary">Submit</button>
        {
          this.state.success &&
          <div class="alert alert-success mt-3" role="alert">
            Successfully submitted!
          </div>
        }
        {
          this.state.error &&
          <div class="alert alert-danger mt-3" role="alert">
            {this.state.error}
          </div>
        }
      </form>
    )
  }
}

