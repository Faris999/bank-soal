import React from 'react';

export default function Problem(props) {
  const {question, answers, tags} = props.problem;
  return (
    <div className="Problem">
      <p className="question">{question}</p>
      <ol type="A">
        {
          answers.map((answer, idx) => (
            <li key={idx} className={getClassName(answer)}>{answer.answerText}</li>
          ))
        }
      </ol>
      <p>tags: {tags.join(', ')}</p>
    </div>
  )
}

function getClassName(answer) {
  return answer.isCorrect ? 'correct' : 'wrong'
}