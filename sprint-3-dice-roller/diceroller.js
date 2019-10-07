function RollSpecificDice(diceId) {
    document.getElementById("" + diceId).value = Math.floor(Math.random() * 6) + 1; //I really don't like this, but it works. 
}

function RollAllOpenDice() {                                                        //I also don't like this. 
    if (document.getElementById("check1").checked == false) {
        document.getElementById("dice1").value = Math.floor(Math.random() * 6) + 1;
    }
    if (document.getElementById("check2").checked == false) {
        document.getElementById("dice2").value = Math.floor(Math.random() * 6) + 1;
    }
    if (document.getElementById("check3").checked == false) {
        document.getElementById("dice3").value = Math.floor(Math.random() * 6) + 1;
    }
    if (document.getElementById("check4").checked == false) {
        document.getElementById("dice4").value = Math.floor(Math.random() * 6) + 1;
    }
    if (document.getElementById("check5").checked == false) {
        document.getElementById("dice5").value = Math.floor(Math.random() * 6) + 1;
    }
}

function RollAllDice() {
    /*var diceForms = document.getElementsByClassName("dice");                      //Maybe figure this one out later? 
    for (let i in diceForms) {
        i.getElementsByTagName("input").value = Math.floor(Math.random()*6 + 1);
    }*/

    document.getElementById("dice1").value = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice2").value = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice3").value = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice4").value = Math.floor(Math.random() * 6) + 1;
    document.getElementById("dice5").value = Math.floor(Math.random() * 6) + 1;
    document.getElementById("check1").checked = false;
    document.getElementById("check2").checked = false;
    document.getElementById("check3").checked = false;
    document.getElementById("check4").checked = false;
    document.getElementById("check5").checked = false;
}