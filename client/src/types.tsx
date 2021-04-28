export type Question = {
    questionText: string,
    answers: Array<Answer>
};

export type Answer = {
    answerText: string,
    isCorrect: boolean
};
