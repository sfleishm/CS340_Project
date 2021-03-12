SELECT * FROM Libraries;

SELECT * FROM Patrons;

SELECT * FROM Authors;

SELECT * FROM Genres;


-- Home Page Select w/ Joins
SELECT Books.bookID, Books.title, GROUP_CONCAT(DISTINCT Genres.genreName ORDER BY Genres.genreName) as 'Genre', Authors.authorName, Books.publicationDate, Books.patronID
FROM Books
JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
JOIN Genres ON Books_Genres.genreID = Genres.genreID
JOIN Authors ON Authors.authorID = Books.authorID
GROUP BY Books.bookID;

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Will need to determine cascading functionality for final design for updates/deletes
-- Will need to look at requirements again to see if deletes/update/inserts on the M:M Books_Genres Table is required. Inserts will absolutely be needed for functionality, but deletes/updates
-- aren't unless required by guidelines.

-- Books Delete
DELETE FROM Books WHERE bookID=?;

-- Authors Delete
DELETE FROM Authors WHERE authorID=?;

-- Genres Delete
DELETE FROM Genres WHERE genreID=?;

-- Patrons Delete
DELETE FROM Patrons WHERE patronID=?;

-- Libraries Delete
DELETE FROM Libraries WHERE libraryID=?;

-- Books_Genres Delete
DELETE FROM Books_Genres WHERE bookID=?;

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Books Insert
INSERT INTO Books (title, authorID, libraryID, publicationDate)
VALUES (?, ?, ?, ?);

-- Authors Insert
INSERT INTO Authors (authorName)
VALUES (?);

-- Genres Insert
INSERT INTO Genres (genreName, description)
VALUES (?, ?);

-- Patrons Insert
INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID)
VALUES (?, ?, ?, ?, ?, ?, ?);

-- Libraries Insert
INSERT INTO Libraries (name, street, state, city, zip)
VALUES (?, ?, ?, ?, ?);

-- Books_Genres Insert
INSERT INTO Books_Genres (genreID, bookID)
VALUES (?, ?);


---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

--Books Update
UPDATE Books SET title=?, authorID=?, patronID=?, libraryID=?, publicationDate=?
WHERE bookID=?

-- Authors Update
UPDATE Authors SET authorName=?
WHERE authorID=?

-- Genres Update
UPDATE Genres SET genreName=?, description=?
WHERE genreID=?

-- Patrons Update
UPDATE Patrons SET firstName=?, lastName=?, state=?, city=?, street=?, zip=?, libraryID=?
Where patronID=?

-- Libraries Update
UPDATE Libraries SET name=?, street=?, state=?, city=?, zip=?
WHERE libraryID=?


-- Insert Page Selects for dropdowns
SELECT libraryID, name FROM Libraries;
SELECT authorID, authorName FROM Authors;
SELECT genreID, genreName FROM Genres;

-- Patrons Update Page
SELECT Patrons.patronID, Patrons.firstName, Patrons.lastName, Patrons.state, Patrons.city, Patrons.street, Patrons.zip, Libraries.libraryID, Libraries.name 
FROM Patrons
LEFT JOIN Libraries ON Patrons.libraryID = Libraries.libraryID;

-- Books Update Page
SELECT Books.bookID, Books.title, Authors.authorID, Authors.authorName, Patrons.patronID, Patrons.firstName, Libraries.libraryID, Libraries.name, Books.publicationDate
FROM Books
JOIN Authors ON Books.authorID = Authors.authorID
LEFT JOIN Patrons ON Books.patronID = Patrons.patronID
LEFT JOIN Libraries ON Books.libraryID = Libraries.libraryID;


-- Books_Genres Update Page
SELECT Books.bookID, Books.title, Genres.genreID, Genres.genreName
FROM Books 
JOIN Books_Genres ON Books.bookID = Books_Genres.bookID
JOIN Genres ON Books_Genres.genreID = Genres.genreID;