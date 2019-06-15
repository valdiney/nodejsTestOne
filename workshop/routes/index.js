var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://valdiney:33473347@cluster0-shard-00-00-i0akk.mongodb.net:27017,cluster0-shard-00-01-i0akk.mongodb.net:27017,cluster0-shard-00-02-i0akk.mongodb.net:27017/meubanco?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority';


router.get('/', function(req, res) {
	MongoClient.connect(url, function(err, db) {
		if (err) throw err;
		
		var customers = db.collection('customers').find({}).sort({nome: 1}).toArray(function(err, result) {
             console.log(result);
             var docs = result;

             res.render('index',  {docs})

		})
		

	})
})


/* GET home page. */
/*router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
  	if (e) {
  		return console.log(e);
  	}

  	faixaEtaria = global.db.faixaEtaria(docs);
  	sexo = global.db.sexo(docs);

  	res.render('index',  {docs, faixaEtaria, sexo})
  })
  
});
*/

/* GET tela cadastrar. */
router.get('/cadastrar', function(req, res) {
    res.render('cadastrar');
});

/* GET tela editar. */
router.get('/editar/:id', function(req, res) {
	var id = req.params.id;
	global.db.findOne(id, (e, docs) => {
		if (e) {
			return console.log(e);
		}

		res.render('editar', {docs, edicao: "sim"});
	});
});

/* GET home page. */
router.post('/editar', function(req, res) {
  const id = req.body.id;

  const nome = req.body.nome;
  const idade = req.body.idade;
  const sexo = req.body.sexo;
  const profissao = req.body.profissao;

  console.log(profissao);
  
  global.db.updateOne(id, {nome, idade, sexo, profissao}, (e, docs) => {
  	if (e) {
  		return console.log(e);
  	}
  	res.redirect('/');
  })
  
});


router.post('/new', function(req, res, next) {
	const nome = req.body.nome;
	const idade = parseInt(req.body.idade);
	const sexo = req.body.sexo;
	global.db.insert({nome, idade, sexo}, (err, result) => {
		if (err) {
			return console.log(err);
		}

		res.redirect('/');
	})
});

router.get('/delete/:id', function(req, res) {
	var id = req.params.id;
	global.db.deleteOne(id, (e, r) => {
		if (e) {
			return console.log(e);
		}

		res.redirect('/');
	});
});


module.exports = router;


//5cff303be15edae22d902826