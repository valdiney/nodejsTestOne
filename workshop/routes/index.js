var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
  	if (e) {
  		return console.log(e);
  	}

  	faixaEtaria = global.db.faixaEtaria(docs);
  	sexo = global.db.sexo(docs);

  	res.render('index',  {docs, faixaEtaria, sexo})
  })
  
});


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
  
  global.db.updateOne(id, {nome, idade, sexo}, (e, docs) => {
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