var express = require('express');
var router = express.Router();
var monk=require('monk')
var db=monk('localhost:27017/aditya');
console.log('connected')
var collection=db.get('signup')

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
	var d=req.body.languages;
	console.log(d);
	var e=req.body.select;
	console.log(e);
	var f=req.body.dob
	console.log(f);
	var g=req.body.pswd;
	console.log(g);
	var h=req.body.number;
	console.log(h);
	// console.log(req.body)
	collection.insert({"name":a,"email":b,"gender":c,"languages":d,"EBC":e,"dob":f,"password":g,"mobile no":h})
	res.redirect("/")
});

module.exports = router;
