document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/books`

const getData = async () => {
    var req = new XMLHttpRequest();
    console.log(req)
    req.open('GET', baseUrl, false);
    req.send(null)
    var tableData = JSON.parse(req.responseText);
    // console.log(tableData);
    return (tableData);
};

function refreshPage(){
    window.location.reload();
    // history.go(0)
} 

function tableDelegation() {
	document.getElementById('tableID').addEventListener('click', function(event){
		var target = event.target;
		if (target.classList.contains("btn-confirm")) {
			UpdateBook(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteBook(target);
		} else if (target.classList.contains("btn-edit")) {
			EditBook(target);
        } else {
			return;
		}
	})
}

const DeleteBook = (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;
    console.log("button works")

    var req = new XMLHttpRequest();
    var submit = 'Book'
    var payload = { bookID: id }

    req.open('DELETE', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function (){
        if(req.status >= 200 && req.status < 400){
            var response = JSON.parse(req.responseText);
        } else{
            console.log("error in network request: " + req.statusText);
        }
    });
    req.send(JSON.stringify(payload));
    refreshPage();
};

const UpdateBook = (target) => {
    var row = target.parentNode.parentNode;

    var idLoc = row.firstElementChild.firstElementChild;
    var id = idLoc.value;
    var titleLoc = row.firstElementChild.nextElementSibling.firstElementChild;
    var title = titleLoc.value;
    var authorIDLoc =titleLoc.parentNode.nextElementSibling.firstElementChild;
    var authorID = authorIDLoc.value;
    var patronIDLoc = authorIDLoc.parentNode.nextElementSibling.firstElementChild;
    var patronID = patronIDLoc.value;
    var libraryIDLoc = patronIDLoc.parentNode.nextElementSibling.firstElementChild;
    var libraryID = libraryIDLoc.value;
    var publicationDateLoc = libraryIDLoc.parentNode.nextElementSibling.firstElementChild;
    var publicationDate = publicationDateLoc.value;
    console.log(title);
    console.log(authorID);
    console.log(patronID);
    console.log(libraryID);
    console.log(publicationDate);
    console.log(id)

    titleLoc.disabled = true;
    authorIDLoc.disabled = true;
    patronIDLoc.disabled = true;
    libraryIDLoc.disabled = true;
    publicationDateLoc.disabled = true;

    target.classList.remove("btn-confirm");
    target.textContent = "Update";

    var req = new XMLHttpRequest();
    var payload = { bookID: id, title: title, authorID: authorID, patronID: patronID, libraryID: libraryID, publicationDate: publicationDate }
    req.open('PUT', baseUrl, true);
    req.setRequestHeader('Content-Type', 'application/json');
    req.addEventListener('load', function(){
		if(req.status >= 200 && req.status < 400){
			var response = JSON.parse(req.responseText);
			makeTable(response);
		} else {
			console.log("Error in network request: " + req.statusText);
		}});
	req.send(JSON.stringify(payload));
};

const EditBook = (target) => {
    var row = target.parentNode.parentNode;
    var title = row.firstElementChild.nextElementSibling.firstElementChild;
    var authorID = title.parentNode.nextElementSibling.firstElementChild;
    var patronID = authorID.parentNode.nextElementSibling.firstElementChild;
    var libraryID = patronID.parentNode.nextElementSibling.firstElementChild;
    var publicationDate = libraryID.parentNode.nextElementSibling.firstElementChild;
    title.disabled = false;
    authorID.disabled = false;
    patronID.disabled = false;
    libraryID.disabled = false;
    publicationDate.disabled = false;

    target.textContent = "Confirm"
    target.classList.add("btn-confirm");
};