document.addEventListener('DOMContentLoaded', SubmitBook)
document.addEventListener('DOMContentLoaded', SubmitLibrary)
document.addEventListener('DOMContentLoaded', SubmitPatron)
document.addEventListener('DOMContentLoaded', SubmitGenre)
document.addEventListener('DOMContentLoaded', SubmitAuthor)

const insertBook = 'INSERT INTO Books (title, authorID, patronID, libraryID, publicationDate) VALUES (?, ?, ?, ?, ?)';

const insertLibary = 'INSERT INTO Libraries (name, street, state, city, zip) VALUES (?, ?, ?, ?, ?)';

const insertPatron = 'INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID) VALUES (?, ?, ?, ?, ?, ?, ?)';

const insertGenre = 'INSERT INTO Genres (genreName, description) VALUES (?, ?)';

const insertAuthor = 'INSERT INTO Authors (authorName) VALUES (?)';

Function SubmitBook() {
    document.getElementById('BookSubmit').addEventListener('click', function(event){
        //skeleton code
    });
};

Function SubmitLibrary() {
    document.getElementById('LibrarySubmit').addEventListener('click', function(event){
        //skeleton code
    });
};

Function SubmitPatron() {
    document.getElementById('PatronSubmit').addEventListener('click', function(event){
        //skeleton code
    });
};

Function SubmitGenre() {
    document.getElementById('GenreSubmit').addEventListener('click', function(event){
        //skeleton code
    });
};

Function SubmitAuthor() {
    document.getElementById('AuthorSubmit').addEventListener('click', function(event){
        //skeleton code
    });
};