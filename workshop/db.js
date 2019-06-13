var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://localhost:27017/meubanco')
 .then(conn => global.conn = conn)
 .catch(err => console.log(err))

var ObjectId = require('mongodb').ObjectID;

function findAll(callback) {
    global.conn.collection('customers').find({}).sort({nome: 1}).toArray(callback);
}

function insert(customer, callback) {
	global.conn.collection('customers').insert(customer, callback);
}

function deleteOne(id, callback) {
	global.conn.collection('customers').deleteOne({_id: ObjectId(id)}, callback);
}

function findOne(id, callback) {
	global.conn.collection('customers').find({_id: ObjectId(id)}).toArray(callback);
}

function updateOne(id, nome, idade, callback) {
	global.conn.collection('customers').updateOne({_id: ObjectId(id)}, {$set: {nome: nome, idade:idade}}, callback);
}

//module.exports = { }

module.exports = { findAll, insert, deleteOne, findOne, updateOne }