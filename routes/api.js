var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/problem/:problemId');

router.get('/problems', function (req, res, next) {
  db.find({}, function (err, docs) {
    res.json(docs);
  });
});

router.post('/newProblem', function (req, res, next) {
  body = req.body;
  if (body.question === undefined) {
    res.status(400).send('Invalid Question');
  } else if (body.answers === undefined || !Array.isArray(body.answers)) {
    res.status(400).send('Invalid Answers');
  } else {
    docs = {
      question: req.body.question,
      answers: req.body.answers
    };

    db.insertSequential(docs, function (err, docs) {
      res.json(docs);
    });
  }
});

module.exports = router;
