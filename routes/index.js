var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://valdiney:33473347@cluster0-shard-00-00-i0akk.mongodb.net:27017,cluster0-shard-00-01-i0akk.mongodb.net:27017,cluster0-shard-00-02-i0akk.mongodb.net:27017/meubanco?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';

/* Pagina Index*/
router.get('*', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		global.db.findAll(db, (e, docs) => {
			faixaEtaria = global.db.faixaEtaria(docs);
  	        sexo = global.db.sexo(docs);
            
            global.db.top4Profissoes(db, (e, profissoes) => {
			    res.render('index',  {docs, faixaEtaria, sexo, profissoes})
		    })
		})
	})
})

/* GET tela de cadastrar. */
router.get('/cadastrar', function(req, res) {
    res.render('cadastrar');
});

/* GET tela de editar. */
router.get('/editar/:id', function(req, res) {
	const id = req.params.id;

	MongoClient.connect(url, function(err, db) {
		if (err) throw err;

		global.db.findOne(db, id, (e, docs) => {
			if (e) {return console.log(e);}

			res.render('editar', {docs});
		})
	})
})

/* POST editar. */
router.post('/editar', function(req, res) {
	const id = req.body.id;
	const nome = req.body.nome;
	const idade = req.body.idade;
	const sexo = req.body.sexo;
	const profissao = req.body.profissao;

    MongoClient.connect(url, function(err, db) {
    	if (err) throw err;

		global.db.updateOne(db, id, {nome, idade, sexo, profissao}, (e, docs) => {
		  	if (e) {return console.log(e);}
		  	res.redirect('/');
		})
	})
})

/*POST cadastrar*/
router.post('/new', function(req, res, next) {
	const nome = req.body.nome;
	const idade = parseInt(req.body.idade);
	const sexo = req.body.sexo;

	MongoClient.connect(url, function(err, db) {
    	if (err) throw err;

		global.db.insert(db, {nome, idade, sexo}, (err, result) => {
			if (err) {return console.log(err);}

			res.redirect('/');
		})
	})
})

/*GET deletar*/
router.get('/delete/:id', function(req, res) {
	const id = req.params.id;

	MongoClient.connect(url, function(err, db) {
    	if (err) throw err;

		global.db.deleteOne(db, id, (e, r) => {
			if (e) {return console.log(e);}

			res.redirect('/');
		})
	})
})


module.exports = router;