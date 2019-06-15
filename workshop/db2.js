
var ObjectId = require('mongodb').ObjectID;

function findAll(db, callback) {
    db.collection('customers').find({}).sort({nome: 1}).toArray(callback);
}


module.exports = { findAll }