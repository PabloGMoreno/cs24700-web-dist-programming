var textSlideshowIndex = 0;
var userArray = [];
var informationArray = [];

var DoorText = function showText() {
    document.getElementById("admin").style.color = "#20FF43";
};

var DoorProtocol = function sneakyDoorProtocol() {
    textSlideshowIndex = 15;
};

function initApplication() {
    console.log('Attempting to load user and information... information.')
    loadJSONUsersFromServer();
    loadJSONInformationFromServer();
}

function loadJSONUsersFromServer() {
    console.log("loadJSONUsersFromServer()");

    //Double checking that our array is empty.
    userArray.length = 0;

    xmlhttpUsers = new XMLHttpRequest();
    xmlhttpUsers.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            userArray = JSON.parse(this.responseText);
        }
    };

    xmlhttpUsers.open("GET", "load-users.php", true);
    xmlhttpUsers.send();   
    console.log(userArray);
}

function loadJSONInformationFromServer() {
    console.log("loadJSONInformationFromServer()");

    //Again, double checking that our array is empty.
    informationArray.length = 0;

    xmlhttpInfo = new XMLHttpRequest();
    xmlhttpInfo.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            informationArray = JSON.parse(this.responseText);
        }
    };

    xmlhttpInfo.open("GET", "load-information.php", true);
    xmlhttpInfo.send(); 
    console.log(informationArray);  
}

function initDoorProtocol() {
    document.getElementById("admin").addEventListener("mouseover", DoorText);
    document.getElementById("admin").addEventListener("dblclick", DoorProtocol);
}

function saveJSONUsersToServer() {
    console.log("saveJSONUsersToServer()");
    xmlhttpSaveUsers = new XMLHttpRequest();
    xmlhttpSaveUsers.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Response: ' + this.responseText);
            setStatus(this.responseText)
        }
    };
    xmlhttpSaveUsers.open("POST", "save-users.php", true);
    xmlhttpSaveUsers.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttpSaveUsers.send("users=" + JSON.stringify(userArray));   
}

function saveJSONInformationToServer() {
    console.log("saveUsersToServer()");
    xmlhttpSaveInformation = new XMLHttpRequest();
    xmlhttpSaveInformation.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log('Response: ' + this.responseText);
            setStatus(this.responseText)
        }
    };
    xmlhttpSaveInformation.open("POST", "save-users.php", true);
    xmlhttpSaveInformation.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xmlhttpSaveInformation.send("information=" + JSON.stringify(informationArray));   
}



//Code created to make the initial text on initial load of the site cleaner.


/*

function textSlideshow() {
    var i;
    console.log(textSlides);
    for (i = 0; i < textSlides.length; i++) {
        textSlides[i].style.display = "none";
    }
    if (textSlideshowIndex > textSlides.length) {
        return;
    }
    textSlideshowIndex++;
    textSlides[textSlideshowIndex - 1].style.display = "block";
    setTimeout(textSlideshow, 5000);
}

window.onload = function(){
    var textSlides = document.getElementsByClassName("slideshow");
};

*/