var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 8
    });

    map.addListener('bounds_changed', function() { //calls every update, should add listener to call this method on "dragend". Works fine otherwise. 
        console.log("The viewport bounds have been changed.")
    });
}