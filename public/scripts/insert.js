document.addEventListener('DOMContentLoaded', SubmitBook)
document.addEventListener('DOMContentLoaded', SubmitLibrary)
document.addEventListener('DOMContentLoaded', SubmitPatron)
document.addEventListener('DOMContentLoaded', SubmitGenre)
document.addEventListener('DOMContentLoaded', SubmitAuthor)


const insertBook = 'INSERT INTO Books (title, authorID, libraryID, publicationDate) VALUES (?, ?, ?, ?)';

const insertLibary = 'INSERT INTO Libraries (name, street, state, city, zip) VALUES (?, ?, ?, ?, ?)';

const insertPatron = 'INSERT INTO Patrons (firstName, lastName, state, city, street, zip, libraryID) VALUES (?, ?, ?, ?, ?, ?, ?)';

const insertGenre = 'INSERT INTO Genres (genreName, description) VALUES (?, ?)';

const insertAuthor = 'INSERT INTO Authors (authorName) VALUES (?)';

function SubmitBook() {
    document.getElementById('BookSubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var submit = 'Book'
        var title = document.getElementById('title').value
        // Get Author Dropdown         // https://stackoverflow.com/questions/3301688/how-do-you-get-the-currently-selected-option-in-a-select-via-javascript
        var authorID = document.getElementById('AuthorDropDown_Books')
        authorID = authorID.options[authorID.selectedIndex].value
        // Get Library Dropdown
        var libraryID = document.getElementById('LibraryDropDown_Books');
        libraryID = libraryID.options[libraryID.selectedIndex].value
        var publicationDate = document.getElementById('publicationDate').value
        // Get Genre1 dropdown
        var genre1 = document.getElementById('genreDropDown_Books1')
        genre1 = genre1.options[genre1.selectedIndex].value
        // Get Genre2 dropdown
        var genre2 = document.getElementById('genreDropDown_Books2')
        genre2 = genre2.options[genre2.selectedIndex].value
        // Get Genre3 dropdown
        var genre3 = document.getElementById('genreDropDown_Books3')
        genre3 = genre3.options[genre3.selectedIndex].value

        var payload = 
            { submit: submit,
              title: title,
              authorID: authorID,
              libraryID: libraryID,
              publicationDate: publicationDate,
              genre1: genre1,
              genre2: genre2,
              genre3: genre3 }
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

function SubmitLibrary() {
    document.getElementById('LibrarySubmit').addEventListener('click', function(event){
        var req = new XMLHttpRequest();
        var submit = 'Library'
        var name = document.getElementById('libraryName').value
        var state = document.getElementById('libraryState').value
        var city = document.getElementById('libraryCity').value
        var street = document.getElementById('libraryStreet').value
        var zip = document.getElementById('libraryZip').value
        var payload = { submit: submit, name: name, state: state, city: city, street: street, zip: zip }
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
        var libraryID = document.getElementById('LibraryDropDown_Patron');
        libraryID = libraryID.options[libraryID.selectedIndex].value
        // alert(libraryID)
        // https://stackoverflow.com/questions/3301688/how-do-you-get-the-currently-selected-option-in-a-select-via-javascript

        
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

