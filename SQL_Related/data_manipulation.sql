SELECT * FROM Libraries

SELECT * FROM Patrons

SELECT * FROM Authors

SELECT * FROM Genres


-- again, this may not be the most effective way to do it, but its what i've got right now
SELECT Books.bookID, Books.title, Genres.genreName, Authors.firstName, Authors.lastName, Books.publicationDate, Books.patronID
FROM Books
JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
JOIN Genres ON Books_Genres.genreID = Genres.genreID
JOIN Authors ON Authors.authorID = Books.authorID;