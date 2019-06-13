var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
  	if (e) {
  		return console.log(e);
  	}

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
	    }

	    if (customer.idade >= 12 && customer.idade <= 17) {
	        faixaEtaria.adolescente += 1;
	    }

	    if (customer.idade >= 18 && customer.idade <= 29) {
	        faixaEtaria.jovem += 1;
	    }

	    if (customer.idade >= 30 && customer.idade <= 60) {
	        faixaEtaria.adulto += 1;
	    }

	    if (customer.idade > 60) {
	        faixaEtaria.idoso += 1;
	    }
    });

    faixaEtaria.crianca = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.crianca / 100;
    faixaEtaria.adolescente = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.adolescente / 100;
    faixaEtaria.jovem = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.jovem / 100;
    faixaEtaria.adulto = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.adulto / 100;
    faixaEtaria.idoso = (faixaEtaria.adolescente + faixaEtaria.jovem + faixaEtaria.adulto + faixaEtaria.idoso) * faixaEtaria.idoso / 100;

  	res.render('index',  {docs, faixaEtaria})
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
  const nome = req.body.nome;
  const idade = req.body.idade;
  const id = req.body.id;

  global.db.updateOne(id, nome, idade, (e, docs) => {
  	if (e) {
  		return console.log(e);
  	}
  	res.redirect('/');
  })
  
});


router.post('/new', function(req, res, next) {
	const nome = req.body.nome;
	const idade = parseInt(req.body.idade);
	global.db.insert({nome, idade}, (err, result) => {
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