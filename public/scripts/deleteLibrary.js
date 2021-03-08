document.addEventListener('DOMContentLoaded', DeleteLibrary)

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

let value = 0
function DeleteLibrary() {
    document.querySelector('#tableID').onclick = async (event) => {
        var libraryID = event.target.parentNode.parentNode.firstChild.nextSibling.innerHTML
        console.log(libraryID)

        var req = new XMLHttpRequest();
        var submit = 'Genre'
        var payload = { libraryID: libraryID }

        req.open('DELETE', baseUrl, true);
        req.setRequestHeader('Content-Type', 'application/json');
        req.addEventListener('load', function (){
            if(req.status >= 200 && req.status < 400){
                var response = JSON.parse(req.responseText);
            } else{
                console.log("error in network request: " + req.statusText);
            }
        });
    value += 1
    req.send(JSON.stringify(payload));
    refreshPage();
    
    
    };
};
