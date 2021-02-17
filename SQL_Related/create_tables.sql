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
    libraryID   int             NOT NULL,   
    PRIMARY KEY (patronID),
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)
);

-- Authors
CREATE TABLE Authors(
    authorID    int             NOT NULL    AUTO_INCREMENT, 
    firstName   VARCHAR(25)     NOT NULL,
    lastName    VARCHAR(25)     NOT NULL, 
    PRIMARY KEY (authorID)
);

-- Books
CREATE TABLE Books(
    bookID      int             NOT NULL    AUTO_INCREMENT,
    title       VARCHAR(100)    NOT NULL,
    authorID    int             NOT NULL,
    patronID    int,
    libraryID   int             NOT NULL,
    publicationDate DATETIME    NOT NULL, 
    PRIMARY KEY (bookID),
    FOREIGN KEY (authorID)  REFERENCES Authors(authorID),
    FOREIGN KEY (patronID)  REFERENCES Patrons(patronID),
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)
);

-- Genres 
CREATE TABLE Genres(
    genreID     int             NOT NULL    AUTO_INCREMENT,
    genreName   VARCHAR(20)     NOT NULL,
    description VARCHAR(50)     NOT NULL,
    PRIMARY KEY (genreID)
);

-- Books_Genres in between for books and genres
CREATE TABLE Books_Genres(
    genreID     int             NOT NULL, 
    bookID      int             NOT NULL,
    FOREIGN KEY (genreID)   REFERENCES Genres(genreID),
    FOREIGN KEY (bookID)    REFERENCES Books(bookID)
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

INSERT INTO Authors (firstName, lastName)
VALUES  ("JRR", "Tolkien"),
        ("Mark", "Twain"),
        ("Ernest", "Hemingway");

INSERT INTO Books (title, authorID, patronID, libraryID, publicationDate)
VALUES  ("The Fellowship of the Ring", 1, NULL, 1, 19540729),
        ("The Two Towers", 1, 3, 1, 19541111),
        ("Return of the King", 1, 3, 1, 19551020);

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