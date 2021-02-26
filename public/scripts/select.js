// Home select

const selectHome =      `SELECT Books.bookID, Books.title, GROUP_CONCAT(DISTINCT Genres.genreName ORDER BY Genres.genreName) as 'Genre', 
                        Authors.authorName, Books.publicationDate, Books.patronID
                        FROM Books 
                        JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
                        JOIN Genres ON Books_Genres.genreID = Genres.genreID
                        JOIN Authors ON Authors.authorID = Books.authorID
                        GROUP BY Books.bookID;
                        `;

const selectLibraries = `SELECT * FROM Libraries`;

const selectPatrons = `SELECT * FROM Patrons`;

const selectAuthors = `SELECT authorID, firstName, lastName FROM Authors`;

const selectGenres = `SELECT * FROM Genres`;

