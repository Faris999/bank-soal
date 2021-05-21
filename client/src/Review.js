import { useState } from "react";

export default function Quiz(props) {
    const problems = props.location?.state?.problems || ['invalid'];
    const answers = props.location?.state?.answers || ['invalid'];
    const [index, setIndex] = useState(0);
    const [indexInput, setIndexInput] = useState(1);
    const currentProblem = problems[index];

    const setIndexSafe = i => {
        let clamped = clamp(0, problems.length - 1, i - 1)
        setIndex(clamped)
        setIndexInput(clamped + 1)
    }

    const prev = () => {
        let clamped = Math.max(0, index - 1);
        setIndex(clamped);
        setIndexInput(clamped + 1)
    }
    const next = () => {
        let clamped = Math.min(problems.length - 1, index + 1)
        setIndex(clamped);
        setIndexInput(clamped + 1)
    }

    const handleSubmit = e => {
        if (e.keyCode === 13) {
            console.log(e.target.value)
            setIndexSafe(e.target.value)
        }
    }

    const getClassName = i => {
        if (currentProblem.answers[i].isCorrect) {
            return 'correct'
        } else if (answers[index] === i) {
            return 'wrong'
        }
        return ''
    }

    const reattempt = () => {
        props.history.push('/quiz', { problems })
    }

    if (currentProblem === 'invalid') {
        return <div>Invalid Quiz</div>
    }

    return (
        <div>
            <button className="btn btn-light" onClick={prev} disabled={index === 0}>Previous</button>
            <span><input value={indexInput} onChange={e => setIndexInput(e.target.value)} onKeyDown={handleSubmit} /> of {problems.length}</span>
            <button className="btn btn-light" onClick={next} disabled={index === problems.length - 1}>Next</button>
            <p>{currentProblem.question}</p>

            {currentProblem.answers.map((ans, i) => (
                <div className={getClassName(i)} key={i}>
                    {ans.answerText}
                </div>
            ))}

            <p>tags: {currentProblem.tags.join(', ')}</p>
            <p>Source: {currentProblem.source}</p>
            <button className="btn btn-primary" onClick={reattempt}>Reattempt</button>
        </div>
    )
}

function clamp(min, max, value) {
    console.log(value)
    return Math.max(min, Math.min(max, value))
}