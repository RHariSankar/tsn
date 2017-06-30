const express = require('express')
const app = express()
app.use(express.static('public'));
var Datastore = require('nedb');
var reso;
var db = new Datastore({filename:'store.db',autoload:true});

app.set('view engine', 'ejs')


app.set('port',process.env.PORT||5000)

db.find({},function(err,result){
	reso=result;
})


app.get('/', function (req, res) {

		console.log(__dirname);

  res.render('signup');

})

app.get('/newuser',function (req,res) {

	var name = req.query.uname;
	var password = req.query.pw;
	var mail = req.query.mail;
	var mobno = req.query.mob;
	var dob = req.query.dob;
	var gender = req.query.gender;

var user = {                  
	
	"name":name,
	"password":password,
	"email":mail,
	"mobile":mobno,
	"DOB":dob,
	"gender": gender
	
	}
db.insert(user,function(err,result){
	//console.log(result);
	console.log(err);
})
	res.render('login')

})


app.get('/login', function (req, res) {

	//console.log(__dirname);

  res.render('login');

})



app.get('/loginsubmit',function (req,res) {

	var userEmail = req.query.email;
	var password = req.query.pw;


var person = {                  
	"email":userEmail,
	"password":password
}
db.find(person,function (err,result) {
	//console.log(result);
	if(result.length>0)
	{  	
		db.find({},function(err,result1){
		//res.send("Login success");
		res.render('home',{res:result1})
		})	
	}
	else
		res.send("Login Unsuccessfull")
})

})

app.get('/userprofile/:name',function(req,res){
	var a=req.params.name;
	//console.log(a);
db.find({name:a},function(err,result){
	console.log(result);
	if(result.length!=0){
		res.render('userprofile',{res:result})
	}
	else{
		res.send("no User Found "+a )
	}
})
})

app.listen(app.get('port'), function () {
  console.log('Example app listening on port 3000!')
})