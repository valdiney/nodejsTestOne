
var ObjectId = require('mongodb').ObjectID;

function findAll(db, callback) {
    db.collection('customers').find({}).sort({nome: 1}).toArray(callback);
}

function insert(db, customer, callback) {
	db.collection('customers').insert(customer, callback);
}

function deleteOne(db, id, callback) {
	db.collection('customers').deleteOne({_id: ObjectId(id)}, callback);
}

function findOne(db, id, callback) {
	db.collection('customers').find({_id: ObjectId(id)}).toArray(callback);
}

function updateOne(db, id, customer, callback) {
	db.collection('customers').updateOne({_id: ObjectId(id)}, customer, callback);
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

function sexo(docs, callback) {
	var sexo = {
		masculino: 0,
		feminino: 0,
		naoInformado: 0
	}

	docs.forEach(function(customer) {
		if (customer.sexo == "Masculino") {
			sexo.masculino += 1;
		} else if (customer.sexo == "Feminino") {
			sexo.feminino += 1;
		} else {
			sexo.naoInformado += 1;
		}
	});

	sexo.masculino = (sexo.masculino + sexo.feminino) * sexo.masculino / 100;
	sexo.feminino = (sexo.masculino + sexo.feminino) * sexo.feminino / 100;
	sexo.naoInformado = (sexo.masculino + sexo.feminino) * sexo.naoInformado / 100;

	return sexo;
}

module.exports = { findAll, insert, deleteOne, findOne, updateOne, faixaEtaria, sexo }