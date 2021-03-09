document.addEventListener('DOMContentLoaded', tableDelegation)

console.log('hello genres delete')

const baseUrl = `http://flip1.engr.oregonstate.edu:5231/genres`

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
		if (target.classList.contains("btn-edit")) {
			UpdateGenre(target);
		} else if (target.classList.contains("btn-delete")) {
			DeleteGenre(target);
		} else {
			return;
		}
	})
};

const DeleteGenre = (target) => {
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

};
