-- Create our tables

-- Libraries 
CREATE TABLE Libraries(
	libraryID   int             NOT NULL    AUTO_INCREMENT,
	name        VARCHAR (100)   NOT NULL,
	state       VARCHAR (50)    NOT NULL,
    city        VARCHAR (50)    NOT NULL,
    street      VARCHAR (100)   NOT NULL,
    zip         VARCHAR (20)    NOT NULL,
    PRIMARY KEY (libraryID)
);

-- Patrons
CREATE TABLE Patrons(
	patronID    int             NOT NULL    AUTO_INCREMENT,
	firstName   VARCHAR (100)   NOT NULL,
	lastName    VARCHAR (50)    NOT NULL,
    state       VARCHAR (50)    NOT NULL,
    city        VARCHAR (20)    NOT NULL,
    street      VARCHAR (100)   NOT NULL,    
    zip         VARCHAR (20)    NOT NULL,
    libraryID   int             ,   
    PRIMARY KEY (patronID),
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID) ON DELETE SET NULL
);

-- Authors
CREATE TABLE Authors(
    authorID    int             NOT NULL    AUTO_INCREMENT, 
    authorName  VARCHAR(30)     NOT NULL, 
    PRIMARY KEY (authorID)
);

-- Books
CREATE TABLE Books(
    bookID      int             NOT NULL    AUTO_INCREMENT,
    title       VARCHAR(100)    NOT NULL,
    authorID    int             ,
    patronID    int,
    libraryID   int             ,
    publicationDate DATE    NOT NULL, 
    PRIMARY KEY (bookID),
    FOREIGN KEY (authorID)  REFERENCES Authors(authorID) ON DELETE SET NULL,
    FOREIGN KEY (patronID)  REFERENCES Patrons(patronID) ON DELETE SET NULL,
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID) ON DELETE SET NULL
);

-- Genres 
CREATE TABLE Genres(
    genreID     int             NOT NULL    AUTO_INCREMENT,
    genreName   VARCHAR(20)     NOT NULL,
    description VARCHAR(100)     NOT NULL,
    PRIMARY KEY (genreID)
);

-- Books_Genres in between for books and genres
CREATE TABLE Books_Genres(
    genreID     int             , 
    bookID      int             ,
    FOREIGN KEY (genreID)   REFERENCES Genres(genreID) ON DELETE CASCADE,
    FOREIGN KEY (bookID)    REFERENCES Books(bookID) ON DELETE CASCADE
);


-- Sample Data

INSERT INTO Libraries (name, street, state, city, zip)
VALUES  ("Middle Earth Library", "Bilbo Street", "Middle Earth", "Osgiliath", "22151"),
        ("Beaver Library", "Imaginary Street", "Oregon", "Corvallis", "97331" ),
        ("Other Beaver Library", "Delusional Street", "Oregon", "Not Corvallis", "97331");

INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID)
VALUES  ("Keaton", "Johnston", "Texas", "Dallas", "123 Main Street", "75207", 1),
        ("Scott", "Fleishman", "Oregon", "Corvallis", "321 Park Street", "97331", 1),
        ("Bilbo", "Baggins", "Middle Earth", "Osgiliath", "Bilbo Street", "22151", 1);

INSERT INTO Authors (authorName)
VALUES  ("JRR Tolkien"),
        ("Mark Twain"),
        ("Ernest Hemingway");

INSERT INTO Books (title, authorID, patronID, libraryID, publicationDate)
VALUES  ("The Fellowship of the Ring", 1, NULL, 1, '1954-07-29'),
        ("The Two Towers", 1, 3, 1, '1954-11-11'),
        ("Return of the King", 1, 3, 1, '1955-10-20');

INSERT INTO Genres (genreName, description)
VALUES  ("Fantasy", "relates to magical, mythical, or supernatural stories"),
        ("Adventure", "Presents danger or gives a sense of excitement"),
        ("Action", "Violence, rescues, chases, fights, etc.");

INSERT INTO Books_Genres(genreID, bookID)
VALUES  (1, 1),
        (2, 1),
        (1, 2),
        (2, 2),
        (1, 3),
        (3, 3);