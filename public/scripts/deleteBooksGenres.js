document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/books_genres`

function refreshPage(){
    window.location.reload();
    window.location.reload();
} 

function tableDelegation() {
	document.getElementById('tableID').addEventListener('click', function(event){
		var target = event.target;
		if (target.classList.contains("btn-edit")) {
			UpdateRelation(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteRelation(target);
		} else {
			return;
		}
	})
}

const DeleteRelation = async (target) => {
    var row = target.parentNode.parentNode;
    var id = row.firstElementChild.firstElementChild.value;
    var id2 = row.firstElementChild.nextElementSibling.firstElementChild.value;
    console.log("button works");
    console.log(id);
    console.log(id2);

    var req = new XMLHttpRequest();
    var submit = 'BookGenre'
    var payload = { bookID: id, genreID: id2 }

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

const UpdateRelation = (target) => {

};


async function asyncCall() {
    console.log('caling')
    await DeleteRelation()
    console.log('done')
}

asyncCall();