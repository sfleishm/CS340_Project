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
const selectLibraries = `SELECT * FROM Libraries`;
const getBooksQuery = 'SELECT * FROM Books';
const getBooksGenresQuery = 'SELECT * FROM Books_Genres'

const selectHome =      `SELECT Books.bookID, Books.title, GROUP_CONCAT(DISTINCT Genres.genreName ORDER BY Genres.genreName) as 'Genres', 
                        Authors.authorName, Books.publicationDate, Libraries.name
                        FROM Books 
                        LEFT OUTER JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
                        LEFT OUTER JOIN Genres ON Books_Genres.genreID = Genres.genreID
                        LEFT OUTER JOIN Authors ON Authors.authorID = Books.authorID
                        LEFT OUTER JOIN Libraries ON Libraries.libraryID = Books.libraryID
                        GROUP BY Books.bookID
                        `
;

const insertBook = 'INSERT INTO Books (title, authorID, libraryID, publicationDate) VALUES (?, ?, ?, ?)';
const insertLibrary = 'INSERT INTO Libraries (name, state, city, street, zip) VALUES (?, ?, ?, ?, ?)';
const insertPatron = 'INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID) VALUES (?, ?, ?, ?, ?, ?, ?)';
const insertGenre = 'INSERT INTO Genres (genreName, description) VALUES (?, ?)';
const insertAuthor = 'INSERT INTO Authors (authorName) VALUES (?)';
const insertBooksGenres = 'INSERT INTO Books_Genres (genreID, bookID) Values (?, ?)'

const deleteAuthors = 'DELETE FROM Authors WHERE authorID=?';
const deleteGenres = 'DELETE FROM Genres WHERE genreID=?';
const deleteLibrary = 'DELETE FROM Libraries WHERE libraryID=?';
const deletePatrons = 'DELETE FROM Patrons WHERE patronID=?';


const getAuthorData = (res) => {
  mysql.pool.query(getAuthorsQuery, (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.json({"rows":rows})
  })
}

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

//#region Insert View

//Insert View
app.get('/insert',function(req,res,next){
    res.render('insert');
});

app.post('/insert',function(req,res,next){

  var {submit} = req.body;
  // if author is being submitted
  if (submit == 'Author') {
    var {authorName} = req.body;
    if (authorName == '') {
      authorName = null
    }
    mysql.pool.query(insertAuthor, [authorName], (err, result) => {
      if(err){
        next(err);
        return;
      }
    })
  } 
  // if genre is being submitted
  else if (submit == 'Genre') {
    var {genreName, description} = req.body;

    if (genreName == '') {
      genreName = null
    }
    if (description == '') {
      description = null
    }
    mysql.pool.query(insertGenre, [genreName, description], (err, result) => {
      if(err){
        next(err);
        return;
      }
    })
  }
  // if patron is being submitted
  else if (submit == 'Patron') {
    var {firstName, lastName, state, city, street, zip, libraryID} = req.body;

    if (firstName == '') {
      firstName = null
    }
    if (lastName == '') {
      lastName = null
    }
    if (state == '') {
      state = null
    }
    if (city == '') {
      city = null
    }
    if (street == '') {
      street = null
    }
    if (zip == '') {
      zip = null
    }
    if (libraryID == '') {
      libraryID = null
    }
    mysql.pool.query(insertPatron, [firstName, lastName, state, city, street, zip, libraryID], (err, result) => {
      if(err){
        next(err);
        return;
      }
    })
  }

  // if library is being submitted
  else if (submit == 'Library') {
    var {name, state, city, street, zip} = req.body;

    if (name == '') {
      name = null
    }
    if (street == '') {
      street = null
    }
    if (state == '') {
      state = null
    }
    if (city == '') {
      city = null
    }
    if (zip == '') {
      zip = null
    }
    mysql.pool.query(insertLibrary, [name, state, city, street, zip], (err, result) => {
      if(err){
        next(err);
        return;
      }
    })
  }

  // if book is being inserted
  else if (submit == 'Book') {
    var {title, authorID, libraryID, publicationDate, genre1, genre2, genre3} = req.body;

    if (title == '') {
      title = null
    }
    if (authorID == '') {
      authorID == null
    }
    if (libraryID == '') {
      libraryID = null
    }
    if (publicationDate == '') {
      publicationDate = null
    }
    if (genre1 == '') {
      genre1 = null
    }
    if (genre2 == '') {
      genre2 = null
    }
    if (genre3 == '') {
      genre3 = null
    }

    mysql.pool.query(insertBook, [title, authorID, libraryID, publicationDate], (err, result) => {
      if(err){
        next(err);
        return;
      }
      lastID = result.insertId;
      console.log(lastID);
      mysql.pool.query(insertBooksGenres, [genre1, lastID], (err, result) => {
        if(err){
          next(err);
          return;
        }
        mysql.pool.query(insertBooksGenres, [genre2, lastID], (err, result) => {
          if(err){
            next(err);
            return;
          }
          mysql.pool.query(insertBooksGenres, [genre3, lastID], (err, result) => {
            if (err){
              next(err);
              return;
            }
          })
        })
      })
    })
  }

});

//#endregion

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

app.get('/books',function(req,res,next){
  var context = {};
  mysql.pool.query(getBooksQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('books', context);
  })
});

app.get('/books_genres',function(req,res,next){
  var context = {};
  mysql.pool.query(getBooksGenresQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('books_genres', context);
  })
});

//#region Deletes

// Trying to delete an author
app.delete('/authors', function(req,res,next) {
  var context = {};
  console.log('ewaoifj')
  var { authorID } = req.body
  mysql.pool.query(deleteAuthors, [authorID], function(err, result){
    if(err){
      next(err);
      return;
    }
    ////location.reload();
  });
});

// Deletes for Genres
app.delete('/genres', function(req,res,next) {
  var context = {};
  console.log('delete to genres')
  var { genreID } = req.body
  mysql.pool.query(deleteGenres, [genreID], function(err, result){
    if(err){
      next(err);
      return;
    }
    ////location.reload();
  });
});

// Deletes for Libraries
app.delete('/libraries', function(req,res,next) {
  var context = {};
  console.log('delete to libraries')
  var { libraryID } = req.body
  mysql.pool.query(deleteLibrary, [libraryID], function(err, result){
    if(err){
      next(err);
      return;
    }
    ////location.reload();
  });
});

// Deletes for Patrons
app.delete('/patrons', function(req,res,next) {
  var context = {};
  console.log('delete to patrons')
  var { patronID } = req.body
  mysql.pool.query(deletePatrons, [patronID], function(err, result){
    if(err){
      next(err);
      return;
    }
    ////location.reload();
  });
});

//#endregion

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