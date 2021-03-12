document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello genres delete')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/genres`

function refreshPage(){
    window.location.reload();
    window.location.reload();
    // history.go(0)
} 

function tableDelegation() {
	document.getElementById('tableID').addEventListener('click', function(event){
		var target = event.target;
		if (target.classList.contains("btn-confirm")) {
			UpdateGenre(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteGenre(target);
		} else if (target.classList.contains("btn-edit")) {
			EditGenre(target);
        } else {
			return;
		}
	})
}

const DeleteGenre = async (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;

    var req = new XMLHttpRequest();
    var submit = 'Genre'
    var payload = { genreID: id }

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

const UpdateGenre = (target) => {
    var row = target.parentNode.parentNode;

    var idLoc = row.firstElementChild.firstElementChild;
    var id = idLoc.value;
    var genreNameLoc = row.firstElementChild.nextElementSibling.firstElementChild;
    var genreName = genreNameLoc.value;
    var descriptionLoc = genreNameLoc.parentNode.nextElementSibling.firstElementChild;
    var description = descriptionLoc.value;
    console.log(genreName);
    console.log(description);

    genreNameLoc.disabled = true;
    descriptionLoc.disabled = true;

    target.classList.remove("btn-confirm");
    target.textContent = "Update";

    var req = new XMLHttpRequest();
    var payload = { genreID: id, genreName: genreName, description: description }
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

const EditGenre = (target) => {
    var row = target.parentNode.parentNode;
    var genreName = row.firstElementChild.nextElementSibling.firstElementChild;
    var description = genreName.parentNode.nextElementSibling.firstElementChild;
    genreName.disabled = false;
    description.disabled = false;

    target.textContent = "Confirm"
    target.classList.add("btn-confirm");
};

async function asyncCall() {
    console.log('caling')
    await DeleteGenre()
    console.log('done')
}

asyncCall();