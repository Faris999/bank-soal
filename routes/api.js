var express = require('express');
var router = express.Router();
var db = require('../database');
router.get('/problem/:problemId');

router.get('/problems', function (req, res, next) {
  db.Question.find({}, function (err, docs) {
    if (err) {
      return next(err);
    }
    res.json(docs);
  });
});

router.post('/problems', function (req, res, next) {
  body = req.body;
  
  console.log(body)

  db.Counter.findByIdAndUpdate({_id: 'entityId'}, {$inc: { seq: req.body.length} }, {useFindAndModify: false, new: true, upsert: true}, function(error, counter)   {
    if(error) {
        console.error(error)
        return next(error);
    }
    db.Question.insertMany(req.body.map((problem, i) => ({
      ...problem,
      _id: counter.seq + i + 1 - req.body.length
    })), (err, data) => {
      if (err) {
        console.error(err)
        return res.status(400).json(err);
      }
      res.json(data);
    })
});

  
});

router.post('/problem', function (req, res, next) {
  body = req.body;
  console.log(body)

  docs = new db.Question({
    question: req.body.question,
    answers: req.body.answers,
    tags: req.body.tags,
    subject: req.body.subject
  });

  docs.save((err, data) => {
    if (err) {
      return res.status(400).json(err);
    }
    res.json(data);
  })
});

module.exports = router;
