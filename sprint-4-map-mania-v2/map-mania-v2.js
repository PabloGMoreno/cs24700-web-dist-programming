var map;

var favoritePlaces = [
    { content: 'Sheffield, Britain', coordinates: { lat: 53.3811, lng: -1.4701 }, iconImagePath: "flag.png", hint: 'This borough once housed a software house named Gremlin Interactive. This studio specifically closed down in 2003.' },
    { content: 'Banff, Canada', coordinates: { lat: 51.1784, lng: -115.5708 }, iconImagePath: "flag.png", hint: 'Canonically, this is the ninth track drivers would race on in the 1993 video game "Top Gear 2." Tim Hortons, anyone?' },
    { content: 'Mammoth Cave National Park', coordinates: { lat: 37.1870, lng: -86.1005 }, iconImagePath: "flag.png", hint: 'This national park houses the longest cave system currently known in the world.' },
    { content: 'Yokohama, Japan', coordinates: { lat: 35.4437, lng: 139.6380 }, iconImagePath: "flag.png", hint: 'This location is famous for the Sankeien Garden. It also holds one of the oldest ports to open for foreign trade (1859).' },
    { content: 'Quito, Ecuador', coordinates: { lat: -0.1807, lng: -78.4678 }, iconImagePath: "flag.png", hint: 'This location boasts being the second highest official capital city, mostly due to it being located near the Andes Mountains.' },
    { content: 'Lewis University in Romeoville, Illinois', coordinates: { lat: 41.6048, lng: -88.0805 }, iconImagePath: "flag.png", hint: 'This location holds a private Catholic and LaSallian university. Also, how could I not?' }
];

var currentPlaceIndex = 0;
var currentPlace = favoritePlaces[currentPlaceIndex];
var score = 0;
var marker;
var seconds = 0;
var timerElement = document.getElementById('timer-box');
var isTimerOn = false;
var runningTimer = setInterval(timerCounter, 1000);
var initialStart = false;

function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 38.8977, lng: -77.0365},
        zoom: 4
    });

    map.addListener('idle', function () { //calls every update, should add listener to call this method on "dragend". Works fine otherwise. 
        //console.log("The viewport bounds have been changed by the user (by moving the map).");
        updateGame();
    });

    map.addListener('dragend', function () {
        //console.log("The user has finished dragging the mouse. Checking if map contains the location we're requesting.");
        if (map.getBounds().contains(currentPlace.coordinates)) {
            //console.log("The location is currently within the user's map bounds.")
        };
    });

    map.addListener('zoom_changed', function () {
        document.getElementById("zoom-box").value = map.getZoom();
    });
}

function startLevel() { //Called on "Start!" button click. Deactivates once clicked, activates again on solving a location.
    console.log("The start button has been clicked.")
    if (isTimerOn == false && currentPlaceIndex <= 4) {
        if (initialStart == false) {
            isTimerOn = true;
            setHint(currentPlace.hint);
            initialStart = true;
        } else {
            currentPlaceIndex++;
            currentPlace = favoritePlaces[currentPlaceIndex];
            isTimerOn = true;
            setHint(currentPlace.hint);
        }
    } 
    if (isTimerOn == false && currentPlaceIndex >= 5) {
        document.getElementById("hint-box").value = "You've finished the game, and you've ended with the score below. Thank you for playing!"
    }
}

function justMessMeUpFam() { //it's the cheat function. 
    //console.log("OHHHHHHHHHH HE CHEATIN");
    for (currentPlaceIndex; currentPlaceIndex <= 5; currentPlaceIndex++) {
        currentPlace = favoritePlaces[currentPlaceIndex];
        marker = marker = new google.maps.Marker({ position: currentPlace.coordinates, map: map });
        setScore(-1);
        setHint("Oh, okay. I guess it wasn't that fun, was it?");
        isTimerOn = false;
        seconds = 0;
    }
}

function updateGame() {
    //console.log("The update function has been called.");
    var zoomLevel = map.getZoom();
    var inBounds = false;

    if (map.getBounds().contains(currentPlace.coordinates)) {
        inBounds = true;
    }

    if (inBounds == true && zoomLevel >= 8) {
        marker = new google.maps.Marker({ position: currentPlace.coordinates, map: map });
        document.getElementById("hint-box").value = "You found the location! You're at " + currentPlace.content + ".";
        if (seconds >= 119) { //minimum score of 1 per solve.
            seconds = 119;
        }
        if (isTimerOn == true) { //sets score based on timer.
            score = score + (120 - seconds);
            setScore(score);
        }
        isTimerOn = false; //turns timer off until start button is clicked again. 
        seconds = 0;
    }
}

function setHint(hint) {
    document.getElementById("hint-box").value = hint;
}

function setScore(score) {
    document.getElementById("score-box").value = score;
}

function timerCounter() {
    if (isTimerOn == true) {
        //console.log("The timer is on.")
        seconds++;
        document.getElementById("timer-box").value = "" + seconds;
    } else {
        //console.log("The timer is off.")
        seconds = 0;
        document.getElementById("timer-box").value = "" + seconds;
    }
}

function howToPlay() {
    alert('To play, first click the start button. \n\n A hint will display in the text box. Feel free to Google the answers to this quiz - the hints are a bit tough.\n\nTo select an answer on the map, simply zoom in on the map with Ctrl+Scroll Wheel, and drag the map to where you think the location is.\n\nYou are only required to zoom in to a magnification of 8 - there are no bonus points for zooming in closer.\n\nScore is calculated based on the amount of seconds that have passed from hitting the start button.\n\nAlternatively, you can just see the locations by clicking the "Cheat?" button.\n\nClick the OK button to remove this alert.');
}