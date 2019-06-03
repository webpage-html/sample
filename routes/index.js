var express = require('express');
var router = express.Router();
var monk=require('monk')
var db=monk('localhost:27017/aditya');
console.log('connected')
var collection=db.get('signup')
var collection1=db.get('form')
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.get('/home', function(req, res) {
	collection1.find({},function(err,docs){
		console.log(docs);
		res.locals.data=docs;
  res.render('home');
});
	});
	
router.post('/signup',function(req,res){
	var a=req.body.name;
	console.log(a);
	var b=req.body.email;
	console.log(b);
	
	var g=req.body.pswd;
	console.log(g);
	var h=req.body.number;
	console.log(h);
	//console.log(req.body)
	collection.insert({"name":a,"email":b,"password":g,"mobile no":h});
	res.redirect("/");
	//2nd method
	// var data=
	// {
	// 	Name:req.body.name,
	// 	Email:req.body.email,
	// 	Gender:req.body.gender,
	// 	EBC:req.body.select,
	// 	DOB:req.body.dob,
	// 	Password:req.body.password,
	// 	Mobile:req.body.number,
	// }
	// collection.insert(data,function(err,data){
	// 	if (err) {
	// 		console.log("error");
	// 	}
	// 	else{
	// 		console.log(data);
	// 	}	
	// res.redirect("/");
	// });
});
router.post('/signin',function(req,res){
	var a=req.body.name1;
	console.log(a);

	var b=req.body.pswd1;
	console.log(b);
	collection.findOne({"name":req.body.name1,"password":req.body.pswd1},function(err,docs){
		if (!docs) {
			console.log("mismatch");
			res.render('index',{err:"invalid username(or)password"});
		}
		else if (docs) {
			console.log("success");
			res.redirect('/home')
		}
		else{
			console.log(err);
		}
	});
});
router.post('/form',function(req,res){
	var a=req.body.name2;
	console.log(a);
	var b=req.body.number2;
	console.log(b);
	collection1.insert({"name":a,"number":b});
	res.redirect("/home");
});
router.post('/update',function(req,res){
	var a=req.body.name2;
	console.log(a);
	var b=req.body.number2;
	console.log(b);
	collection1.update({"_id":req.body.id},{$set:{"name":a,"number":b}},function(err,docs){
		res.redirect('/home');
	});
});
router.post('/remove',function(req,res){
	var id=req.body.no;
	//console.log(id);
	collection1.remove({"_id":id},function(err,docs){
		//console.log(docs);
		res.send(docs);
	});
});
router.post('/edit',function(req,res){
	var id=req.body.no1;
	console.log(id);
	collection1.find({"_id":id},function(err,docs){
		res.send(docs);
});
});

module.exports = router;
