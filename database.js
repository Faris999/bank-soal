require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const Schema = mongoose.Schema;

const CounterSchema = Schema({
  _id: {type: String, required: true},
  seq: { type: Number, default: 0 }
});

const Counter = mongoose.model('counter', CounterSchema);

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
}, {_id: false});

const questionSchema = new Schema({
  _id: Number,
  question: {
    type: String,
    required: true
  },
  answers: {
    type: [answerSchema],
    required: true,
    validate: [(value) => {
      return value.length > 1 && value.filter((el) => el.isCorrect).length === 1
    }, "Must be only 1 correct"]
  },
  tags: [String],
  subject: {
    type: String,
    required: true
  }
});

questionSchema.pre('save', function(next) {
  var doc = this;
  Counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {useFindAndModify: false, new: true, upsert: true}, function(error, counter)   {
      if(error) {
          console.error(error)
          return next(error);
      }
      doc._id = counter.seq;
      next();
  });
});


questionSchema.pre('insertMany', function(next) {
  var doc = this;
  console.log(doc._id)
  next()
  // Counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: 1} }, {useFindAndModify: false, new: true, upsert: true}, function(error, counter)   {
  //     if(error) {
  //         console.error(error)
  //         return next(error);
  //     }
  //     doc._id = counter.seq;
  //     next();
  // });
});

const Answer = new mongoose.model('Answer', answerSchema);
const Question = new mongoose.model('Question', questionSchema)

module.exports = {Question, Counter}