//document.addEventListener('DOMContentLoaded', SubmitBook)
//document.addEventListener('DOMContentLoaded', SubmitLibrary)
document.addEventListener('DOMContentLoaded', SubmitPatron)
document.addEventListener('DOMContentLoaded', SubmitGenre)
document.addEventListener('DOMContentLoaded', SubmitAuthor)

const insertBook = 'INSERT INTO Books (title, authorID, patronID, libraryID, publicationDate) VALUES (?, ?, ?, ?, ?)';

const insertLibary = 'INSERT INTO Libraries (name, street, state, city, zip) VALUES (?, ?, ?, ?, ?)';

const insertPatron = 'INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID) VALUES (?, ?, ?, ?, ?, ?, ?)';

const insertGenre = 'INSERT INTO Genres (genreName, description) VALUES (?, ?)';

const insertAuthor = 'INSERT INTO Authors (authorName) VALUES (?)';

//function SubmitBook() {
//    document.getElementById('BookSubmit').addEventListener('click', function(event){
//        //skeleton code
//    });
//};

//function SubmitLibrary() {
//    document.getElementById('LibrarySubmit').addEventListener('click', function(event){
//        //skeleton code
//    });
//};

function SubmitPatron() {
    document.getElementById('PatronSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var submit = 'Patron'
        var firstName = document.getElementById('firstName').value
        var lastName = document.getElementById('lastName').value
        var state = document.getElementById('patronState').value
        var city = document.getElementById('patronCity').value
        var street = document.getElementById('patronStreet').value
        var zip = document.getElementById('patronZip').value
        var libraryID = document.getElementById('patronLibraryID').value
        var payload = { submit: submit, firstName: firstName, lastName: lastName, state: state, city: city, street: street, zip: zip, libraryID: libraryID }
        req.open('POST', 'http://flip1.engr.oregonstate.edu:5231/insert', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
            } else{
                console.log("error in network request: " + req.statusText);
            }
    });
    req.send(JSON.stringify(payload));
    });
};

function SubmitGenre() {
    document.getElementById('GenreSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var submit = 'Genre'
        var genreName = document.getElementById('genreName').value
        var description = document.getElementById('genreDescription').value
        var payload = { submit: submit, genreName: genreName, description: description }
        req.open('POST', 'http://flip1.engr.oregonstate.edu:5231/insert', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
            } else{
                console.log("error in network request: " + req.statusText);
            }
    });
    req.send(JSON.stringify(payload));
    });
};

function SubmitAuthor() {
    document.getElementById('AuthorSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var submit = 'Author'
        var name = document.getElementById('authorName').value
        var payload = { submit: submit, authorName: name }
        req.open('POST', 'http://flip1.engr.oregonstate.edu:5231/insert', true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function(){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
            } else{
                console.log("error in network request: " + req.statusText);
            }
        });
        req.send(JSON.stringify(payload));
    });
};