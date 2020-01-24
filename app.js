const contentMain = document.getElementById("content-main");

function loadPage(e) {
  const page = e.target.getAttribute("data-page");
  axios
    .get(`./pages./${page}.html`)
    .then(res => {
      contentMain.innerHTML = res.data;
      makeLinksWorking();
    })
    .catch(err => {
      console.error(err);
    });

}

const playersArray = [];
var hiddenList = [];
var submitList = [];
var playersOrder = [];
var playerNumber = 0;
var looser = "";
var wordRemove = "";

function makeLinksWorking() {
  var objectList = document.getElementById("objectList");
  var input = document.getElementById("newWord");
  var input2 = document.getElementById("newPlayer");
  var playersList = document.getElementById("playersList");
  var player = document.querySelector("#section1 span");
  var loosingPlayer = document.querySelector("#loosingPlayer");
  var winningSequence = document.querySelector("#displaySequence");


  function test() {
    let newArray = [...submitList];
    newArray.pop();
    if (hiddenList.join() === newArray.join()) return true;
    else return false;
  }

  function addWordToArray() {
    let addWord = document.getElementById("newWord").value;
    submitList.push(addWord);
  }

  function printWords() {

    let addWord = document.getElementById("newWord").value;
    const li = document.createElement("li");
    li.textContent = addWord;
    objectList.appendChild(li);
    start()

    document.getElementById("newWord").value = "";
    document.getElementById("newWord").focus();
  }

  function start() {
    const items = document.querySelectorAll("li");

    items.forEach(function (item) {
      item.onclick = function (evt) {
        wordRemove = evt.target.innerHTML
        submitList.splice(submitList.indexOf(wordRemove), 1);
        playersArray.splice(playersArray.indexOf(wordRemove), 1);
        evt.target.remove();
      };
    });
  }

  function clearWords() {
    objectList.innerHTML = "";
  }

  if (document.getElementById("btnOk") !== null) {
    let addWord = document.getElementById("newWord");
    var btnOk = document.getElementById("btnOk");
    btnOk.onclick = function () {
      if (addWord.value.match(/\w+/)) {
        addWordToArray();
        printWords();
      }
      else {
        alert("please enter a word or serie of words")
      }
    }
  }

  if (document.getElementById("btnOk") !== null) {
    input.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnOk").click();
      }
    });
  }

  if (document.getElementById("btnSubmit") !== null) {
    var btnSubmit = document.getElementById("btnSubmit");
    btnSubmit.onclick = function () {
      if (test()) {
        clearWords();
        hiddenList = [...submitList];
        submitList = [];
        nextPlayer();
        player.innerHTML = playersOrder[playerNumber];
        document.getElementById("newWord").focus();
      }
      else {
        looser = playersOrder[playerNumber];
        axios
          .get(`./pages./lose.html`)
          .then(res => {
            contentMain.innerHTML = res.data;
            makeLinksWorking();
          })
          .catch(err => {
            console.error(err);
          });

      }
    }
  }

  function firstPlayer() {
    player.innerHTML = playersOrder[playerNumber];
  }

  if (document.getElementById("playerName") !== null) {
    firstPlayer();
  }

  function displayLoosingPlayer() {
    loosingPlayer.innerHTML = looser;
    winningSequence.innerHTML = hiddenList.join(" - ");
  }

  if (document.getElementById("loosingPlayer") !== null) {
    displayLoosingPlayer();
  }

  function turnOrder() {
    let copyPlayers = [...playersArray]
    while (copyPlayers.length !== 0) {
      let random = Math.floor(Math.random() * copyPlayers.length);
      playersOrder.push(copyPlayers[random]);
      copyPlayers.splice(random, 1)
    }
  }


  function nextPlayer() {
    if (playerNumber < playersOrder.length - 1) playerNumber++;
    else playerNumber = 0;
  }


  if (document.getElementById("btnPlay") !== null) {
    var btnPlay = document.getElementById("btnPlay");
    btnPlay.onclick = function () {
      axios
        .get(`./pages./players.html`)
        .then(res => {
          contentMain.innerHTML = res.data;
          makeLinksWorking();
        })
        .catch(err => {
          console.error(err);
        });

    }
  }

  if (document.getElementById("btnRules") !== null) {
    var btnRules = document.getElementById("btnRules");
    btnRules.onclick = function () {
      axios
        .get(`./pages./rules.html`)
        .then(res => {
          contentMain.innerHTML = res.data;
          makeLinksWorking();
        })
        .catch(err => {
          console.error(err);
        });

    }
  }

  function printPlayers() {

    let addPlayer = document.getElementById("newPlayer").value;
    const li = document.createElement("li");
    li.textContent = addPlayer;
    playersList.appendChild(li);
    start();

    document.getElementById("newPlayer").value = "";
    document.getElementById("newPlayer").focus();
  }

  function addPlayerToArray() {
    let addPlayer = document.getElementById("newPlayer").value;
    playersArray.push(addPlayer);
  }


  if (document.getElementById("btnAdd") !== null) {
    var btnAdd = document.getElementById("btnAdd");
    btnAdd.onclick = function () {
      addPlayerToArray();
      printPlayers();
    }
  }

  if (document.getElementById("btnAdd") !== null) {
    input2.addEventListener("keyup", function (event) {
      if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("btnAdd").click();
      }
    });
  }

  if (document.getElementById("btnStart") !== null) {
    var btnStart = document.getElementById("btnStart");
    btnStart.onclick = function () {
      turnOrder();
      axios
        .get(`./pages./game.html`)
        .then(res => {
          contentMain.innerHTML = res.data;
          makeLinksWorking();
        })
        .catch(err => {
          console.error(err);
        });
      // player.innerHTML = playersOrder[playerNumber];
    }
  }

  if (document.getElementById("btnHome") !== null) {
    var btnHome = document.getElementById("btnHome");
    btnHome.onclick = function () {
      axios
        .get(`./pages./home.html`)
        .then(res => {
          contentMain.innerHTML = res.data;
          makeLinksWorking();
        })
        .catch(err => {
          console.error(err);
        });
      // player.innerHTML = playersOrder[playerNumber];
    }
  }

  if (document.getElementById("btnAgain") !== null) {
    var btnAgain = document.getElementById("btnAgain");
    btnAgain.onclick = function () {
      turnOrder();
      hiddenList = []
      submitList = []
      axios
        .get(`./pages./game.html`)
        .then(res => {
          contentMain.innerHTML = res.data;
          makeLinksWorking();
        })
        .catch(err => {
          console.error(err);
        });
      // player.innerHTML = playersOrder[playerNumber];
    }
  }




  document
    .querySelectorAll("#nav-main .link")
    .forEach(link => (link.onclick = loadPage));

}
makeLinksWorking();