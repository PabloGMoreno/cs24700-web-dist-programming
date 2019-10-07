var map;
function initMap() {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: 38.8977, lng: -77.0365 },
        zoom: 8
    });

/*    var script = document.createElement('script');

    script.src = 'file name for earthquakes.geojson';
    
    document.getElementsByTagName('head')[0].appendChild(script);


    // Loop through the results array and place a marker for each
    // set of coordinates.
    window.eqfeed_callback = function (results) {
        for (var i = 0; i < results.features.length; i++) {
            var coords = results.features[i].geometry.coordinates;
            var latLng = new google.maps.LatLng(coords[1], coords[0]);
            var marker = new google.maps.Marker({
                position: latLng,
                map: map
            });
        }
    }
*/

var loc1 = new google.maps.LatLng(36.205, 138.253);

    map.addListener('bounds_changed', function () { //calls every update, should add listener to call this method on "dragend". Works fine otherwise. 
        console.log("The viewport bounds have been changed by the user (by moving the map).")
    });

    map.addListener('dragend', function () {
        console.log("The user has finished dragging the mouse. Checking if map contains the location we're requesting.");
        if (map.getBounds().contains(loc1)) {
            console.log("The location is currently within the user's map bounds.")
        };
    });

    map.addListener('zoom_changed', function () {
        console.log("The user's current zoom is: " + map.getZoom());
    });
}