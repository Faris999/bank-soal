var Datastore = require('nedb');
var db = new Datastore({ filename: './database/data.db', autoload: true });

db.insert({ _id: '__autoid__', value: -1 });

db.insertSequential = function (docs, callback) {
  db.getNextId(function(err, id) {
    if (err) {
      callback && callback(err)
    }
    docs._id = id;
    db.insert(docs, callback);
  })
}

db.getNextId = function (onFind) {
  console.log('b')
  db.findOne({ _id: '__autoid__' }, function (err, doc) {
    console.log('c')
    if (err) {
      onFind && onFind(err)
    } else {
      // Update and returns the index value
      db.update({ _id: '__autoid__' }, { $set: { value: ++doc.value } }, {},
        function (err, count) {
          onFind && onFind(err, doc.value);
        });
    }
  });
  return db;
}

module.exports = db;