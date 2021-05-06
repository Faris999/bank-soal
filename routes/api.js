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

router.post('/problem', function (req, res, next) {
  body = req.body;

  docs = new db.Question({
    question: req.body.question,
    answers: req.body.answers,
    tags: req.body.tags
  });

  docs.save((err, data) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.json(data);
  })
});

module.exports = router;
