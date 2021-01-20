-- Create our tables

-- Libraries 
CREATE TABLE Libraries(
	libraryID   int             NOT NULL    AUTO_INCREMENT,
	name        VARCHAR (100)   NOT NULL,
	state       VARCHAR (50)    NOT NULL,
    city        VARCHAR (50)    NOT NULL,
    zip         VARCHAR (20)    NOT NULL
    PRIMARY KEY (libraryID)
);

-- Patrons
CREATE TABLE Patrons(
	patronID    int             NOT NULL,
	firstName   VARCHAR (100)   NOT NULL,
	lastName    VARCHAR (50)    NOT NULL,
    state       VARCHAR (50)    NOT NULL,
    city        VARCHAR (20)    NOT NULL,
    street      VARCHAR (100)   NOT NULL,    
    zip         VARCHAR (20)    NOT NULL,
    libraryID   int             NOT NULL   
    PRIMARY KEY (patronID)
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)
);

-- Books
CREATE TABLE Books(
    bookID      int             NOT NULL    AUTO_INCREMENT,
    title       VARCHAR(100)    NOT NULL,
    authorID    int             NOT NULL,
    patronID    int,
    libraryID   int             NOT NULL 
    PRIMARY KEY (bookID)
    FOREIGN KEY (authorID)  REFERENCES Authors(authorID)
    FOREIGN KEY (patronID)  REFERENCES Patrons(patronID)
    FOREIGN KEY (libraryID) REFERENCES Libraries(libraryID)

)

-- Authors
CREATE TABLE Authors(
    authorID    int             NOT NULL    AUTO_INCREMENT, 
    firstName   VARCHAR(25)     NOT NULL,
    lastName    VARCHAR(25)     NOT NULL 
    PRIMARY KEY (authorID)
)

-- Genres 
CREATE TABLE Genres(
    genreID     int             NOT NULL    AUTO_INCREMENT,
    genreName   VARCHAR(20)     NOT NULL,
    description VARCHAR(50)     NOT NULL,
    PRIMARY KEY (genreID)
)

-- Books_Genres in between for books and genres
CREATE TABLE Books_Genres(
    genreID     int             NOT NULL, 
    bookID      int             NOT NULL
    FOREIGN KEY (genreID)   REFERENCES Genres(genreID)
    FOREIGN KEY (bookID)    REFERENCES Books(bookID)
)