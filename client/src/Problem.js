import React from 'react';

export default function Problem(props) {
  const {question, answers, tags, source} = props.problem;
  return (
    <div className="Problem border border-3 m-lg-2" >
      <p className="question">{question}</p>
      <ol type="A">
        {
          answers.map((answer, idx) => (
            <li key={idx}>{answer.answerText}</li>
          ))
        }
      </ol>
      <p>tags: {tags.join(', ')}</p>
      <p>Source: {source}</p>
    </div>
  )
}

// eslint-disable-next-line no-unused-vars
function getClassName(answer) {
  return answer.isCorrect ? 'correct' : 'wrong'
}