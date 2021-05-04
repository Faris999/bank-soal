require('dotenv').config();
import mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    answerText: {
        type: String,
        required: true
    },
    isCorrect: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
});

const questionSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answers: {
        type: [answerSchema],
        required: true,
        validate: [(value: Array<answerSchema>) => {
            return value.length > 1 && value.filter((el) => el.isCorrect).length === 1
        }, "Must be only 1 correct"]
    },
    tags: [String]
});

const Answer = new mongoose.model('Answer', answerSchema);
const Question = new mongoose.model('Question', questionSchema)

module.exports = { Question }