var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

	
router.post('/signup',function(req,res){
	var a=req.body.name;
	console.log(a);

	var b=req.body.email;
	console.log(b);

	var c=req.body.gender;
	console.log(c);

	var e=req.body.dob
	console.log(e);

	var f=req.body.password;
	console.log(f);

	var g=req.body.number;
	console.log(g);
	res.redirect("/")
});

module.exports = router;
