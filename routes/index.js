var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

	
router.post('/signup',function(req,res){
	var a=req.body.name;
	console.log(a);

	var c=req.body.email;
	console.log(c);

	var d=req.body.bod
	console.log(d);

	var b=req.body.password;
	console.log(b);

	var e=req.body.number;
	console.log(e);
	res.redirect("/")
});

module.exports = router;
