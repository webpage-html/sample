var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/aditya');
var moment=require('moment');
var nodemailer = require('nodemailer');
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
	var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'varalakshmi8798@gmail.com',
    pass: 'Chinni@1998',
  }
});

var mailOptions = {
  from: 'varalakshmi8798@gmail.com',
  to: req.body.email,
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' );
  }
});
var a=req.body.name;
console.log(a);
var b=req.body.email;
console.log(b);
var c=req.body.pswd;
console.log(c);
var d=req.body.number;
console.log(d);
console.log(req.body)
collection.insert({"name":a,"email":b,"password":c,"mobile no":d});
res.redirect("/");
});

router.post('/signin',function(req,res){
	var a=req.body.name1;
	console.log(a);

	var b=req.body.pswd1;
	console.log(b);
	var signintime=moment().format("L");
	console.log(signintime);
	collection.update({"name":a},{$set:{"signintime":signintime}});
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
