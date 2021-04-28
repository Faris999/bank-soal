import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Question, Answer } from './types'

class App extends React.Component<any, any> {

  constructor(props: any) {
    super(props);
    this.state = {
      answerShown: false,
      question: "Apa itu A?",
      answers: [
        { answerText: 'a', isCorrect: true, isClicked: false },
        { answerText: 'b', isCorrect: false, isClicked: false },
        { answerText: 'c', isCorrect: false, isClicked: false },
        { answerText: 'd', isCorrect: false, isClicked: false }]
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick(answer: Answer) {
    console.log('a')
    return () => {
      this.setState((state: any) => {
        if (!state.answerShown) {
          state.answers.forEach(function (part: Answer, index: number, arr: Array<Answer>) {
            if (part.answerText === answer.answerText) {
              arr[index].isClicked = true;
            }
          })
          return { answers: state.answers, answerShown: true }
        }
      })
    }
  }

  showCorrectAnswer() {
    this.setState({ answerShown: true })
  }

  getClassName(answer: Answer): string {
    if (this.state.answerShown) {
      if (answer.isCorrect) {
        return 'correct'
      } else if (answer.isClicked) {
        return answer.isCorrect ? 'correct' : 'wrong'
      }
    }
    return ''
  }

  render() {
    return (
      <main className="App">
        <p>{this.state.question}</p>
        <ul>
          {
            this.state.answers.map((answer: Answer) => (
              <li key={answer.answerText} className={this.getClassName(answer)} onClick={this.handleClick(answer)}>{answer.answerText}</li>
            ))
          }
        </ul>

      </main>
    );
  }
}

export default App;
