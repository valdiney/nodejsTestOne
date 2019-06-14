var mongoClient = require('mongodb').MongoClient;
//mongoClient.connect('mongodb://valdiney:33473347@cluster0-shard-00-00-i0akk.mongodb.net:27017,cluster0-shard-00-01-i0akk.mongodb.net:27017,cluster0-shard-00-02-i0akk.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
//mongoClient.connect('mongodb://localhost:27017/meubanco')
mongoClient.connect('mongodb+srv://valdiney:33473347@cluster0-i0akk.mongodb.net/test?retryWrites=true&w=majority')
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