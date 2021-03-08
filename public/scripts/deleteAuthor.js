document.addEventListener('DOMContentLoaded', DeleteAuthor)


const deleteAuthor = 'INSERT INTO Authors (authorName) VALUES (?)';
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

let value = 0
function DeleteAuthor() {
    //var authorID = document.event.target.parentNode.parentNode.firstChild.nextSibling.innerHTML
    //console.log(authorID)
    //document.getElementById('DeleteAuthor').onclick =(function(event){
    //document.addEventListener('onclick', function(event) {
    document.querySelector('#tableID').onclick = async (event) => {
        var authorID = event.target.parentNode.parentNode.firstChild.nextSibling.innerHTML
        console.log(authorID)

        var req = new XMLHttpRequest();
        var submit = 'Author'
        var payload = { authorID: authorID }

        req.open('DELETE', 'http://flip1.engr.oregonstate.edu:5231/authors', true);
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



// (async () => {
//     console.log(value)
//     let value = await DeleteAuthor();
//     console.log(value)

    
// })();
