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

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Will need to determine cascading functionality for final design for updates/deletes
-- Will need to look at requirements again to see if deletes/update/inserts on the M:M Books_Genres Table is required. Inserts will absolutely be needed for functionality, but deletes/updates
-- aren't unless required by guidelines.

-- Books Delete
DELETE FROM Books WHERE bookID=?

-- Authors Delete
DELETE FROM Authors WHERE authorID=?

-- Genres Delete
DELETE FROM Genres WHERE genreID=?

-- Patrons Delete
DELETE FROM Patrons WHERE patronID=?

-- Libraries Delete
DELETE FROM Libraries WHERE libraryID=?

----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-- Books Insert
INSERT INTO Books (title, authorID, patronID, libraryID, publicationDate)
VALUES (:titleInput, :authorIDInput, :patronIDInput, :libraryIDInput, :publicationDateInput);

-- Authors Insert
INSERT INTO Authors (authorName)
VALUES (:authorNameInput);

-- Genres Insert
INSERT INTO Genres (genreName, description)
VALUES (:genreNameInput, :descriptionInput);

-- Patrons Insert
INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID)
VALUES (:firstNameInput, :lastNameInput, :stateInput, :cityInput, :streetInput, :zipInput, :libraryIDInput);

-- Libraries Insert
INSERT INTO Libraries (name, street, state, city, zip)
VALUES (:nameInput, :streetInput, :stateInput, :cityInput, :zipInput);

-- Books_Genres Insert
INSERT INTO Books_Genres (genreID, bookID)
VALUES (:genreIDInput, :bookIDInput);


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
