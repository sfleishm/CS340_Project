var express = require('express');
var mysql = require('./dbcon.js');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5231);

app.use(express.static('public'))

//Home View
app.get('/home',function(req,res,next){
    res.render('home');
  });

//Insert View
app.get('/insert',function(req,res,next){
    res.render('insert');
});

//Update-delete view
app.get('/check-out-return',function(req,res,next){
    res.render('check-out-return');
});

//insert
app.post('/',function(req,res){
    getAllData(res);
  });

//delete
app.delete('/',function(req,res,next){
    getAllData(res);
  });

//update
app.put('/',function(req,res,next){
    getAllData(res);
  });

app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
