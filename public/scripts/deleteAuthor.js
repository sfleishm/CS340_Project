document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/authors`

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
			UpdateAuthor(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteAuthor(target);
		} else if (target.classList.contains("btn-edit")) {
			EditAuthor(target);
        } else {
			return;
		}
	})
}

const DeleteAuthor = (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;

    var req = new XMLHttpRequest();
    var submit = 'Author'
    var payload = { authorID: id }

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

const EditAuthor = (target) => {
    var row = target.parentNode.parentNode;
    var authorName = row.firstElementChild.nextElementSibling.firstElementChild;
    authorName.disabled = false;
    target.textContent = "Confirm"
    target.classList.add("btn-confirm");
};

const UpdateAuthor = (target) => {
    var row = target.parentNode.parentNode;
    var idLoc = row.firstElementChild.firstElementChild;
    var id = idLoc.value;
    var authorNameLoc = row.firstElementChild.nextElementSibling.firstElementChild;
    var authorName = authorNameLoc.value;
    authorNameLoc.disabled = true;
    target.classList.remove("btn-confirm");
    target.textContent = "Update"


    var req = new XMLHttpRequest();
    var payload = { authorID: id, authorName: authorName }
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