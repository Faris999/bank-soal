import { useState } from "react";

export default function Quiz(props) {
    const problems = props.location?.state?.problems || ['invalid'];
    const [index, setIndex] = useState(0);
    const [indexInput, setIndexInput] = useState(1);
    const currentProblem = problems[index];

    const setIndexSafe = i => {
        let clamped = clamp(0, problems.length-1, i-1)
        setIndex(clamped)
        setIndexInput(clamped+1)
    }

    const prev = () => {
        let clamped = Math.max(0, index-1);
        setIndex(clamped);
        setIndexInput(clamped+1)
    }
    const next = () => {
        let clamped = Math.min(problems.length-1, index+1)
        setIndex(clamped);
        setIndexInput(clamped+1)
    }

    const handleSubmit = e => {
        if (e.keyCode === 13) {
            console.log(e.target.value)
            setIndexSafe(e.target.value)
        }
    }

    if (currentProblem === 'invalid') {
        return <div>Invalid Quiz</div>
    }

    return (
        <div>
            <p>{currentProblem.question}</p>
            {currentProblem.answers.map((ans, i) => (
                <div key={i}>{ans.answerText}</div>
            ))}
            <button onClick={prev}>Previous</button>
            <span><input value={indexInput} onChange={e => setIndexInput(e.target.value)} onKeyDown={handleSubmit}/> of {problems.length}</span>
            <button onClick={next}>Next</button>
        </div>
    )
}

function clamp(min, max, value) {
    console.log(value)
    return Math.max(min, Math.min(max, value))
}