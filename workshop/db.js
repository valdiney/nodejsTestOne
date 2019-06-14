var mongoClient = require('mongodb').MongoClient;
mongoClient.connect('mongodb://valdiney:33473347@cluster0-shard-00-00-i0akk.mongodb.net:27017,cluster0-shard-00-01-i0akk.mongodb.net:27017,cluster0-shard-00-02-i0akk.mongodb.net:27017/meubanco?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority')
//mongoClient.connect('mongodb://localhost:27017/meubanco')
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

function faixaEtaria(docs, callback) {

	var faixaEtaria = {
    	crianca: 0,
	    adolescente: 0,
	    jovem: 0,
	    adulto: 0,
	    idoso: 0
    }

    docs.forEach(function(customer) {
    	if (customer.idade > 0 && customer.idade <= 11) {
            faixaEtaria.crianca += 1;
	    } else if (customer.idade >= 12 && customer.idade <= 17) {
	        faixaEtaria.adolescente += 1;
	    } else if (customer.idade >= 18 && customer.idade <= 29) {
	        faixaEtaria.jovem += 1;
	    } else if (customer.idade >= 30 && customer.idade <= 60) {
	        faixaEtaria.adulto += 1;
	    } else if (customer.idade > 60) {
	        faixaEtaria.idoso += 1;
	    }
    });

    faixaEtaria.crianca = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.crianca / 100;
    faixaEtaria.adolescente = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.adolescente / 100;
    faixaEtaria.jovem = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.jovem / 100;
    faixaEtaria.adulto = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.adulto / 100;
    faixaEtaria.idoso = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.idoso / 100;
    
    return faixaEtaria;
}

module.exports = { findAll, insert, deleteOne, findOne, updateOne, faixaEtaria }