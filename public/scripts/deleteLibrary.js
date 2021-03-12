document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello library delete')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/libraries`

function refreshPage(){
    window.location.reload();
    window.location.reload();
    // history.go(0)
} 

function tableDelegation() {
	document.getElementById('tableID').addEventListener('click', function(event){
		var target = event.target;
		if (target.classList.contains("btn-confirm")) {
			UpdateLibrary(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteLibrary(target);
		} else if (target.classList.contains("btn-edit")) {
			EditLibrary(target);
        } else {
			return;
		}
	})
}

const DeleteLibrary = async (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;

    var req = new XMLHttpRequest();
    var submit = 'Library'
    var payload = { libraryID: id }

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

const UpdateLibrary = (target) => {
    var row = target.parentNode.parentNode;

    var idLoc = row.firstElementChild.firstElementChild;
    var id = idLoc.value;
    var nameLoc = row.firstElementChild.nextElementSibling.firstElementChild;
    var name = nameLoc.value;
    var stateLoc = nameLoc.parentNode.nextElementSibling.firstElementChild;
    var state = stateLoc.value;
    var cityLoc = stateLoc.parentNode.nextElementSibling.firstElementChild;
    var city = cityLoc.value;
    var streetLoc = cityLoc.parentNode.nextElementSibling.firstElementChild;
    var street = streetLoc.value;
    var zipLoc = streetLoc.parentNode.nextElementSibling.firstElementChild;
    var zip = zipLoc.value;
    console.log(name);
    console.log(state);
    console.log(city);
    console.log(street);
    console.log(zip);
    console.log(id)

    nameLoc.disabled = true;
    stateLoc.disabled = true;
    cityLoc.disabled = true;
    streetLoc.disabled = true;
    zipLoc.disabled = true;

    target.classList.remove("btn-confirm");
    target.textContent = "Update";

    var req = new XMLHttpRequest();
    var payload = { libraryID: id, name: name, state: state, city: city, street: street, zip: zip }
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

const EditLibrary = (target) => {
    var row = target.parentNode.parentNode;
    var name = row.firstElementChild.nextElementSibling.firstElementChild;
    var state = name.parentNode.nextElementSibling.firstElementChild;
    var city = state.parentNode.nextElementSibling.firstElementChild;
    var street = city.parentNode.nextElementSibling.firstElementChild;
    var zip = street.parentNode.nextElementSibling.firstElementChild;
    name.disabled = false;
    state.disabled = false;
    city.disabled = false;
    street.disabled = false;
    zip.disabled = false;

    target.textContent = "Confirm"
    target.classList.add("btn-confirm");
};



async function asyncCall() {
    console.log('caling')
    await DeleteLibrary()
    console.log('done')
}

asyncCall();