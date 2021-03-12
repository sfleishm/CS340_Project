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
const deleteBook = 'DELETE FROM Books WHERE bookID=?';
const deleteBookGenre = 'DELETE FROM Books_Genres WHERE bookID=? AND genreID=?';

const updateAuthor = 'UPDATE Authors SET authorName=? WHERE authorID=?';
const updateLibrary = 'UPDATE Libraries SET name=?, state=?, city=?, street=?, zip=? WHERE libraryID=?';
const updatePatron = 'UPDATE Patrons SET firstName=?, lastName=?, state=?, city=?, street=?, zip=?, libraryID=? WHERE patronID=?';
const updateGenre = 'UPDATE Genres SET genreName=?, description=? WHERE genreID=?';
const updateBook = 'UPDATE Books SET title=?, authorID=?, patronID=?, libraryID=?, publicationDate=? WHERE bookID=?';


const getAuthorData = (res) => {
  mysql.pool.query(getAuthorsQuery, (err, rows, fields) => {
    if (err) {
      next(err);
      return;
    }
    res.json({"rows":rows})
  })
}

//#region Basic Routes

//Home View
app.get('/home',function(req,res,next){
  var context = {};
  mysql.pool.query(selectHome, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;

    for (var n = 0; n < context.results.length; ++n) {
      dateList = context.results[n].publicationDate.toDateString();
      dateList = dateList.split(' ');
      var year = dateList[3]
      var month = dateList[1]
      var day = dateList[2]
      if (month == "Jan") {
        month = "01";
      } else if (month == "Feb") {
        month = "02";
      } else if (month == "Mar") {
        month = "03";
      } else if (month == "Apr") {
        month = "04";
      } else if (month == "May") {
        month = "05";
      } else if (month == "Jun") {
        month = "06";
      } else if (month == "Jul") {
        month = "07";
      } else if (month == "Aug") {
        month = "08";
      } else if (month == "Sep") {
        month = "09";
      } else if (month == "Oct") {
        month = "10";
      } else if (month == "Nov") {
        month = "11";
      } else if (month == "Dec") {
        month = "12";
      }
      
      formattedDate = year + "-" + month + "-" + day
      context.results[n].publicationDate = formattedDate
    }
    
    res.render('home', context);
  })
});

app.get('/insert',function(req,res,next){
  var context = {};
  mysql.pool.query(getAuthorsQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.authors = rows;
    // console.log(context.results )
  })
  mysql.pool.query(selectLibraries, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.libs = rows;
    // console.log(context )
  })
  mysql.pool.query(getGenresQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.genres = rows;
    // console.log(context )
    res.render('insert', context);
  })
  
});

//Check-out-return view
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
  
    for (var n = 0; n < context.results.length; ++n) {
      dateList = context.results[n].publicationDate.toDateString();
      dateList = dateList.split(' ');
      var year = dateList[3]
      var month = dateList[1]
      var day = dateList[2]
      if (month == "Jan") {
        month = "01";
      } else if (month == "Feb") {
        month = "02";
      } else if (month == "Mar") {
        month = "03";
      } else if (month == "Apr") {
        month = "04";
      } else if (month == "May") {
        month = "05";
      } else if (month == "Jun") {
        month = "06";
      } else if (month == "Jul") {
        month = "07";
      } else if (month == "Aug") {
        month = "08";
      } else if (month == "Sep") {
        month = "09";
      } else if (month == "Oct") {
        month = "10";
      } else if (month == "Nov") {
        month = "11";
      } else if (month == "Dec") {
        month = "12";
      }
      
      formattedDate = year + "-" + month + "-" + day
      context.results[n].publicationDate = formattedDate
    }
  
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

//#endregion

//#region Inserts

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
  var context = {};
  mysql.pool.query(getAuthorsQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('authors', context);
  })
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
  var context = {};
  mysql.pool.query(getGenresQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('genres', context);
  })
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
  mysql.pool.query(selectLibraries, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('libraries', context);
  })
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
  var context = {};
  mysql.pool.query(getPatronsQuery, function(err, rows, fields){
  if(err) {
    next(err);
    return;
  }
  context.results = rows;
  res.render('patrons', context)});
    ////location.reload();
  });
});

// Deletes for Books
app.delete('/books', function(req,res,next) {
  var context = {};
  console.log('delete to books')
  var { bookID } = req.body
  mysql.pool.query(deleteBook, [bookID], function(err, result){
    if(err){
      next(err);
      return;
    }
  
  var context = {};
  mysql.pool.query(getBooksQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
  
    for (var n = 0; n < context.results.length; ++n) {
      dateList = context.results[n].publicationDate.toDateString();
      dateList = dateList.split(' ');
      var year = dateList[3]
      var month = dateList[1]
      var day = dateList[2]
      if (month == "Jan") {
        month = "01";
      } else if (month == "Feb") {
        month = "02";
      } else if (month == "Mar") {
        month = "03";
      } else if (month == "Apr") {
        month = "04";
      } else if (month == "May") {
        month = "05";
      } else if (month == "Jun") {
        month = "06";
      } else if (month == "Jul") {
        month = "07";
      } else if (month == "Aug") {
        month = "08";
      } else if (month == "Sep") {
        month = "09";
      } else if (month == "Oct") {
        month = "10";
      } else if (month == "Nov") {
        month = "11";
      } else if (month == "Dec") {
        month = "12";
      }
      
      formattedDate = year + "-" + month + "-" + day
      context.results[n].publicationDate = formattedDate
    }
  
    res.render('books', context);
  })
    ////location.reload();
  });
});

app.delete('/books_genres', function(req,res,next) {
  var context = {};
  console.log('delete to books genres')
  var { bookID, genreID } = req.body
  if (bookID == '') {
    bookID = null
  }
  if (genreID == '') {
    genreID = null
  }

  mysql.pool.query(deleteBookGenre, [bookID, genreID], function(err, result){
    if(err){
      next(err);
      return;
    }

  
  })
  var context = {};
  mysql.pool.query(getBooksGenresQuery, function(err, rows, fields){
    if(err) {
      next(err);
      return;
    }
    context.results = rows;
    res.render('books_genres', context);
    ////location.reload();
  });
});

//#endregion

//#region Updates

//update Authors
app.put('/authors',function(req,res,next){
  var context = {};
  var { authorName, authorID} = req.body;
  if (authorName == "") {
    authorName = NULL;
  }

  mysql.pool.query(updateAuthor,
    [authorName, authorID],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
  });
});

//update Patrons
app.put('/patrons',function(req,res,next){
  var context = {};
  var { firstName, lastName, state, city, street, zip, libraryID, patronID} = req.body;
  if (firstName == "") {
    firstName = NULL;
  }
  if (lastName == "") {
    lastName = NULL;
  }
  if (state == "") {
    state = NULL;
  }
  if (city == "") {
    city = NULL;
  }
  if (street == "") {
    street = NULL;
  }
  if (zip == "") {
    zip = NULL;
  }
  if (libraryID == "") {
    libraryID = NULL;
  }

  mysql.pool.query(updatePatron,
    [firstName, lastName, state, city, street, zip, libraryID, patronID],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
  });
});

//update Libraries
app.put('/libraries',function(req,res,next){
  var context = {};
  var { libraryID, name, state, city, street, zip } = req.body;
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


  mysql.pool.query(updateLibrary,
    [name, state, city, street, zip, libraryID],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
  });
});

//update Genres
app.put('/genres',function(req,res,next){
  var context = {};
  var { genreName, description, genreID} = req.body;
  if (genreName == '') {
    genreName = null
  }
  if (description == '') {
    description = null
  }

  mysql.pool.query(updateGenre,
    [genreName, description, genreID],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
  });
});

//update Books
app.put('/books',function(req,res,next){
  var context = {};
  var { title, authorID, patronID, libraryID, publicationDate, bookID } = req.body;

  if (title == '') {
    title = null
  }
  if (authorID == '') {
    authorID == null
  }
  if (patronID == '') {
    patronID = null
  }
  if (libraryID == '') {
    libraryID = null
  }
  if (publicationDate == '') {
    publicationDate = null
  }

  mysql.pool.query(updateBook,
    [title, authorID, patronID, libraryID, publicationDate, bookID],
    (err, result) => {
    if(err){
      next(err);
      return;
    }
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