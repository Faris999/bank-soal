export default function Result(props) {
    const problems = props.location?.state?.problems || ['invalid'];
    const answers = props.location?.state?.answers || ['invalid'];

    const numCorrect = problems.reduce((acc, problem, i) => {
        return acc + problem.answers[answers[i]].isCorrect
    }, 0)

    const review = () => {
        props.history.push('/review', {problems, answers})
    }

    return (
        <div>
            <p>Correct {numCorrect} out of {problems.length}</p>
            <button className="btn btn-primary" onClick={review}>Review</button>
        </div>
    )
}