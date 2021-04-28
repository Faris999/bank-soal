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
        { answerText: 'a', isCorrect: true },
        { answerText: 'b', isCorrect: false },
        { answerText: 'c', isCorrect: false },
        { answerText: 'd', isCorrect: false }]
    }
    this.showCorrectAnswer = this.showCorrectAnswer.bind(this)
  }

  showCorrectAnswer() {
    this.setState({answerShown: true})
  }

  getClassName(answer: Answer): string {
    if (this.state.answerShown) {
      return answer.isCorrect ? 'correct' : 'wrong'
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
              <li key={answer.answerText} className={this.getClassName(answer)} onClick={this.showCorrectAnswer}>{answer.answerText}</li>
            ))
          }
        </ul>

      </main>
    );
  }
}

// const showAnswer = () => {
//   this.setState
// }

// const answersList = (answers: Array<Answer>) => {
//   return answers.map((answer: Answer) => {
//     return (
//       <li className="" key={answer.answerText} onClick={showAnswer}>
//         {answer.answerText}
//       </li>
//     );
//   })
// }

// function QuestionComponent(props: any) {
//   console.log(props)
//   return (
//     <div className="Question">
//       <p>{props.question}</p>
//       <ul>
//         {answersList(props.answers)}
//       </ul>
//     </div>
//   );
// }

export default App;
