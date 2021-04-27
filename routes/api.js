var express = require('express');
var router = express.Router();
var db = require('../database');

router.get('/problem/:problemId');

router.get('/problems', function(req, res, next) {
  db.find({}, function(err, docs) {
    res.json(docs);
  });
});

router.get('/newProblem', function(req, res, next) {
  db.getNextId(function(err, docs) {
    console.log('a')
    db.insert({_id: docs, name:"test"}, function(err, docs) {
      res.send(docs);
    });
  })
});



module.exports = router;
