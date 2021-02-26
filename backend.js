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

const getAuthorsQuery = 'SELECT authorID, authorName FROM Authors';
const getGenresQuery = 'SELECT * FROM Genres';
const getPatronsQuery = 'SELECT * FROM Patrons';

const selectHome =      `SELECT Books.bookID, Books.title, GROUP_CONCAT(DISTINCT Genres.genreName ORDER BY Genres.genreName) as 'Genre', 
                        Authors.authorName, Books.publicationDate, Libary.name
                        FROM Books 
                        JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
                        JOIN Genres ON Books_Genres.genreID = Genres.genreID
                        JOIN Authors ON Authors.authorID = Books.authorID
                        JOIN Library ON Library.libraryID = Books.libraryID
                        GROUP BY Books.bookID;
                        `
;

                        
const selectLibraries = `SELECT * FROM Libraries`;

//Home View
app.get('/home',function(req,res,next){
  var context = {};
  mysql.pool.query(selectHome, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('home', context);
  })
});

//Insert View
app.get('/insert',function(req,res,next){
    res.render('insert');
});

//Update-delete view
app.get('/check-out-return',function(req,res,next){
    res.render('check-out-return');
});

// Authors
app.get('/authors',function(req,res,next){
  var context = {};
  mysql.pool.query(getAuthorsQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('authors', context);
  })
});

// Libraries
app.get('/libraries',function(req,res,next){
  var context = {};
  mysql.pool.query(selectLibraries, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('libraries', context);
  })
});

// Patrons 
app.get('/patrons',function(req,res,next){
  var context = {};
  mysql.pool.query(getPatronsQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('patrons', context);
  })
});

// Genres
app.get('/genres',function(req,res,next){
  var context = {};
  mysql.pool.query(getGenresQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('genres', context);
  })
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