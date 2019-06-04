var express = require('express');
var router = express.Router();
var monk=require('monk');
var db=monk('localhost:27017/aditya');
var moment=require('moment');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var randomstring=require('randomstring');
var multer=require('multer');
var sessions=require('client-sessions');
//var upload = multer({ dest: 'uploads/' })
console.log('connected')
var collection=db.get('signup')
var collection1=db.get('form')
//multer 
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/images/')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
});

var upload = multer({ storage: storage })
/* GET home page. */
router.get('/', function(req, res, next) {
	if(req.session && req.session.user){
    res.locals.user = req.session.user;
    res.redirect('/home');
  }
  else{
    req.session.reset();
    res.render('index');
  }
});
router.get('/logout', function(req, res){
  req.session.reset();
  res.redirect('/');
});
router.get('/forgotpassword', function(req, res, next) {
  res.render('forgotpassword');
});
router.post('/forgotpassword',function(req,res){
	var email=req.body.email;
	console.log(email);
	var otp=randomstring.generate(5);
	var msg="<html><head></head><body><b>"+otp+"</b></body></html>"

	var transporter = nodemailer.createTransport({
service: 'gmail',
 host: 'smtp.gmail.com',
port: 465,
secure: true, // use SSL
auth: {
    user: 'luckyummella@gmail.com',
    pass: 'Aug1998@Chinni'
}
});
var name = req.body.vname;              
var mailOptions = {
from: '"Vara Lakshmi" <>', // sender address
to: req.body.email, // list of receivers
subject: 'hi',
html:msg
}
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
if(error){
console.log("Email could not sent due to error: "+error);
}else{
console.log("Email has been sent successfully");
}
collection.update({"email":email},{$set:{"password":otp}});
res.redirect('/');
});
});

router.get('/home', function(req, res) {
	if(req.session && req.session.user){
    res.locals.user = req.session.user;
	collection1.find({},function(err,docs){
		console.log(docs);
		res.locals.data=docs;
  res.render('home');
});
}
else{
	res.redirect('/home')
}
});
	
router.post('/signup',function(req,res){
var transporter = nodemailer.createTransport({
service: 'gmail',
 host: 'smtp.gmail.com',
port: 465,
secure: true, // use SSL
auth: {
    user: 'luckyummella@gmail.com',
    pass: 'Aug1998@Chinni'
}
});
var name = req.body.vname;              
var mailOptions = {
from: '"Vara Lakshmi" <>', // sender address
to: req.body.email, // list of receivers
subject: 'hi',
}
// send mail with defined transport object
transporter.sendMail(mailOptions, function(error, response){
if(error){
console.log("Email could not sent due to error: "+error);
}else{
console.log("Email has been sent successfully");
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
// router.get('/',function(req,res){
// 	if(req.session && req.session.user){
//     res.locals.user = req.session.user;
//     res.redirect('/home');
//   }
//   else{
//     req.session.reset();
//     res.render('index');
//   }
// });
router.post('/signin',function(req,res){
	var a=req.body.name1;
	console.log(a);
	var b=req.body.pswd1;
	console.log(b);
	var signintime=moment().format("L");
	console.log(signintime);
	collection.update({"name":a},{$set:{"signintime":signintime}});
	collection.findOne({"name":req.body.name1,"password":req.body.pswd1},function(err,docs){
		//session
		if (!docs) {
			console.log("mismatch");
			res.render('index',{err:"invalid username(or)password"});
		}
		else if (docs) {
			delete docs.password
			req.session.user = docs;
			console.log("success");
			res.redirect('/home')
		}
		else{
			console.log(err);
		}
	});
});
router.post('/form', upload.single('image'),function(req,res){
	console.log(req.file);
	var a=req.body.name2;
	console.log(a);
	var b=req.body.number2;
	console.log(b);
	var img=req.file.originalname;
	console.log(img);
	collection1.insert({"name":a,"number":b,"image":img});
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
