import { useState } from "react";

export default function Quiz(props) {
    const problems = props.location?.state?.problems || ['invalid'];
    const [index, setIndex] = useState(0);
    const [answers, setAnswers] = useState(new Array(problems.length).fill(-1));
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

    const handleClick = i => {
        return () => {
            let prevAns = [...answers];
            prevAns[index] = i
            setAnswers(prevAns)
        }
    }

    const submit = () => {
        props.history.push('/result', {problems, answers})
    }

    if (currentProblem === 'invalid') {
        return <div>Invalid Quiz</div>
    }

    return (
        <div>
            <button className="btn btn-light" onClick={prev} disabled={index === 0}>Previous</button>
            <span><input value={indexInput} onChange={e => setIndexInput(e.target.value)} onKeyDown={handleSubmit} /> of {problems.length}</span>
            <button className="btn btn-light" onClick={next} disabled={index === problems.length-1}>Next</button>
            <p>{currentProblem.question}</p>
            
            {currentProblem.answers.map((ans, i) => (
                <div className="form-check" key={i}>
                <input className="form-check-input" type="radio" name="flexRadioDefault" id={"flexRadioDefault"+i} checked={answers[index] === i} onChange={handleClick(i)}/>
                <label className="form-check-label" htmlFor={"flexRadioDefault"+i}  onClick={handleClick(i)}>
                {ans.answerText}
            </label>
            </div>
            ))}
            
            {index === problems.length-1 && 
                <button className="btn btn-primary" onClick={submit}>Submit</button>
            }
        </div>
    )
}

function clamp(min, max, value) {
    console.log(value)
    return Math.max(min, Math.min(max, value))
}