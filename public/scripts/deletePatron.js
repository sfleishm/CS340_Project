document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello library delete')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/patrons`

// const getData = async () => {
//     var req = new XMLHttpRequest();
//     console.log(req)
//     req.open('GET', baseUrl, false);
//     req.send(null)
//     var tableData = JSON.parse(req.responseText);
//     // console.log(tableData);
//     return (tableData);
// };

function refreshPage(){
    window.location.reload();
    // history.go(0)
} 

function tableDelegation() {
	document.getElementById('tableID').addEventListener('click', function(event){
		var target = event.target;
		if (target.classList.contains("btn-confirm")) {
			UpdatePatron(target);
		} else if (target.classList.contains("btn-delete")) {
			DeletePatron(target);
		} else if (target.classList.contains("btn-edit")) {
			EditPatron(target);
        } else {
			return;
		}
	})
}

const DeletePatron = (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;

    var req = new XMLHttpRequest();
    var submit = 'Patron'
    var payload = { patronID: id }

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

const UpdatePatron = (target) => {
    var row = target.parentNode.parentNode;

    var idLoc = row.firstElementChild.firstElementChild;
    var id = idLoc.value;
    var firstNameLoc = row.firstElementChild.nextElementSibling.firstElementChild;
    var firstName = firstNameLoc.value;
    var lastNameLoc = firstNameLoc.parentNode.nextElementSibling.firstElementChild;
    var lastName = lastNameLoc.value;
    var stateLoc = lastNameLoc.parentNode.nextElementSibling.firstElementChild;
    var state = stateLoc.value;
    var cityLoc = stateLoc.parentNode.nextElementSibling.firstElementChild;
    var city = cityLoc.value;
    var streetLoc = cityLoc.parentNode.nextElementSibling.firstElementChild;
    var street = streetLoc.value;
    var zipLoc = streetLoc.parentNode.nextElementSibling.firstElementChild;
    var zip = zipLoc.value;
    var libraryIDLoc = zipLoc.parentNode.nextElementSibling.firstElementChild;
    var libraryID = libraryIDLoc.value;
    console.log(firstName);
    console.log(lastName);
    console.log(state);
    console.log(city);
    console.log(street);
    console.log(zip);
    console.log(libraryID);
    console.log(id)

    firstNameLoc.disabled = true;
    lastNameLoc.disabled = true;
    stateLoc.disabled = true;
    cityLoc.disabled = true;
    streetLoc.disabled = true;
    zipLoc.disabled = true;
    libraryIDLoc.disabled = true;

    target.classList.remove("btn-confirm");
    target.textContent = "Update";

    var req = new XMLHttpRequest();
    var payload = { patronID: id, firstName: firstName, lastName: lastName, state: state, city: city, street: street, zip: zip, libraryID: libraryID }
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

const EditPatron = (target) => {
    var row = target.parentNode.parentNode;
    var firstName = row.firstElementChild.nextElementSibling.firstElementChild;
    var lastName = firstName.parentNode.nextElementSibling.firstElementChild;
    var state = lastName.parentNode.nextElementSibling.firstElementChild;
    var city = state.parentNode.nextElementSibling.firstElementChild;
    var street = city.parentNode.nextElementSibling.firstElementChild;
    var zip = street.parentNode.nextElementSibling.firstElementChild;
    var libraryID = zip.parentNode.nextElementSibling.firstElementChild;
    firstName.disabled = false;
    lastName.disabled = false;
    state.disabled = false;
    city.disabled = false;
    street.disabled = false;
    zip.disabled = false;
    libraryID.disabled = false;

    target.textContent = "Confirm"
    target.classList.add("btn-confirm");
};