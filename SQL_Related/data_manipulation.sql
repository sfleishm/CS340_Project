SELECT * FROM Libraries;

SELECT * FROM Patrons;

SELECT * FROM Authors;

SELECT * FROM Genres;


-- Thanks for figuring out how to do this Scott!
SELECT Books.bookID, Books.title, GROUP_CONCAT(DISTINCT Genres.genreName ORDER BY Genres.genreName) as 'Genre', Authors.authorName, Books.publicationDate, Books.patronID
FROM Books
JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
JOIN Genres ON Books_Genres.genreID = Genres.genreID
JOIN Authors ON Authors.authorID = Books.authorID
GROUP BY Books.bookID;