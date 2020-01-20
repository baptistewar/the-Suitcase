var hiddenList = [];
var submitList = [];
var objectList = document.getElementById("objectList");
var input = document.getElementById("newWord");




function test() {
    let newArray = [...submitList]
    newArray.pop();
    console.log(submitList);
    if (hiddenList.join() === newArray.join()) return true;
    else return false;
}

function addWordToArray() {
    let addWord = document.getElementById("newWord").value;
    submitList.push(addWord)
}

function printWords() {

    let addWord = document.getElementById("newWord").value;
    const li = document.createElement("li");
    li.textContent = addWord;
    objectList.appendChild(li);

    document.getElementById("newWord").value = "";
    document.getElementById("newWord").focus();
}


function clearWords() {
    objectList.innerHTML = "";
}

var btnOk = document.getElementById("btnOk");
btnOk.onclick = function () {
    addWordToArray()
    printWords()
    console.log(submitList);
}

var btnSubmit = document.getElementById("btnSubmit");
btnSubmit.onclick = function () {
    if (test()) {
        clearWords()
        hiddenList = [...submitList]
        submitList = [];
        // nextPlayer();
    }
    else {
        window.location.href = "./loose.html";
    }
}

input.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnOk").click();
    }
});














