var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('new', { title: 'Express' });
});

router.get('/find/:id', function(req, res) {
	var id = req.params.id;
	global.db.findOne(id, (e, docs) => {
		if (e) {
			return console.log(e);
		}

		res.render('new', {docs});
		
	});

});

module.exports = router;
