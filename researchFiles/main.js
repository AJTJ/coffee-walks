//create an app namesape to hold all methods
const pos = {};

//create an empty array to house filtered location
const locations = [];
const locationsNames = [];
const locationsList = () => {
    for (let i = 0; i < locations.length; i++) {
        console.log(locations[i].lat);
    }
}


// array with types to be passed in arguments
pos.venues = ['cafe', 'gas_station', `shopping_mall`];

// get user permission to track location
// through button above map
pos.getLocation = function () {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            pos.lat = position.coords.latitude;
            pos.lng = position.coords.longitude;
            pos.latlng = position.coords.latitude + ',' + position.coords.longitude;
            // pass in pos.getVenues to access user location
            pos.getVenues();
            pos.getVenuesNames();
            //calling the changeMap callback function:
            pos.changeMap(pos.lat, pos.lng, pos.lat, pos.lng);
        });
    }
}

//  essentially a function to have all the params in the pos.venues
// array passed one by one to the ajax requesst and use $.when() .
//to retrieve into and pass it all into one array
pos.getVenues = () => {

    finalLocations = pos.venues.map((item) => {
        return pos.getVenue(item);
    });

    $.when(...finalLocations)
        .then((...locations) => {
            locations = locations
                .map(el => el[0].results)
                .reduce((acc, curr) => [...acc, ...curr], [])
                .map(el2 => el2.geometry.location);
            let locationCoordinates = locations[0];
            let locationCoordinates2 = locations[1];
            let locationCoordinates3 = locations[2];
            let locationCoordinates4 = locations[3];
            let locationCoordinates5 = locations[4];
            let locationCoordinates6 = locations[5];
            pos.addMarkers(locationCoordinates, locationCoordinates2, locationCoordinates3, locationCoordinates4, locationCoordinates5, locationCoordinates6);
        });
}

pos.getVenuesNames = () => {

    finalLocations = pos.venues.map((item) => {
        return pos.getVenue(item);
    });

    $.when(...finalLocations)
        .then((...locationsNames) => {
            locationsNames = locationsNames
                .map(el => el[0].results)
                .reduce((acc, curr) => [...acc, ...curr], [])
                .map(el2 => el2.name);
            console.log(locationsNames);
            let locationName1 = locationsNames[0];
            let locationName2 = locationsNames[1];
            let locationName3 = locationsNames[2];
            let locationName4 = locationsNames[3];
            let locationName5 = locationsNames[4];
            let locationName6 = locationsNames[5];
            pos.addMarkerName1(locationName1);
            pos.addMarkerName2(locationName2);
            pos.addMarkerName3(locationName3);
            pos.addMarkerName4(locationName4);
            pos.addMarkerName5(locationName5);
            pos.addMarkerName6(locationName6);
        });
}


// ajax req
pos.getVenue = function (venueType) {
    return $.ajax({
        url: 'https://proxy.hackeryou.com',
        method: 'GET',
        dataType: 'json',
        data: {
            reqUrl: 'https://maps.googleapis.com/maps/api/place/nearbysearch/json',
            params: {
                key: 'AIzaSyDUU6juCsXP394uu6q5X2PRW_-6J6wLXP0',
                location: `${pos.lat},${pos.lng}`,
                rankby: `distance`,
                type: venueType
            },
        },
    })
}


//change the map to reflect the users location
pos.changeMap = function initMap(lat, lng, userLat, userLng) {
    map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat, lng: lng },
        zoom: 15,
        // custom map style
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eaf1f9"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#cae9f2"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadff5"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f1daf5"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f6dedf"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dbf1c5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b2eeed"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#daddf5"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f0e9c1"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f6eedd"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e0daf5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b6d8ef"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]

    });
    infoWindow = new google.maps.InfoWindow;
    let UserLocation = new google.maps.Marker({
        position: { lat: userLat, lng: userLng },
        map: map,
        title: 'You are here!',
        animation: google.maps.Animation.BOUNCE,
    });
}

//add six markers to showcase the closet six results from our API search with info windows
pos.addMarkers = function initMap(locationCoordinates, locationCoordinates2, locationCoordinates3, locationCoordinates4, locationCoordinates5, locationCoordinates6, locationName1) {
    const icon = 'images/toilet5.png'

    //FIRST LOCATION MARKER
    let marker1 = new google.maps.Marker({
        position: locationCoordinates,
        map: map,
        icon: icon
    });

    pos.addMarkerName1 = (name1) => {

        let infowindow1 = new google.maps.InfoWindow({
            content: name1,
            maxWidth: 100
        });

        marker1.addListener('click', function () {
            infowindow1.open(map, marker1);
        });
    }

    //SECOND LOCATION MARKER
    let marker2 = new google.maps.Marker({
        position: locationCoordinates2,
        map: map,
        icon: icon
    });

    pos.addMarkerName2 = (name2) => {

        let infowindow2 = new google.maps.InfoWindow({
            content: name2,
            maxWidth: 100
        });

        marker2.addListener('click', function () {
            infowindow2.open(map, marker2);
        });
    }

    //THIRD LOCATION MARKER
    let marker3 = new google.maps.Marker({
        position: locationCoordinates3,
        map: map,
        icon: icon

    });

    pos.addMarkerName3 = (name3) => {

        let infowindow3 = new google.maps.InfoWindow({
            content: name3,
            maxWidth: 100
        });

        marker3.addListener('click', function () {
            infowindow3.open(map, marker3);
        });
    }

    //FOURTH LOCATION MARKER
    let marker4 = new google.maps.Marker({
        position: locationCoordinates4,
        map: map,
        icon: icon

    });

    pos.addMarkerName4 = (name4) => {

        let infowindow4 = new google.maps.InfoWindow({
            content: name4,
            maxWidth: 100
        });

        marker4.addListener('click', function () {
            infowindow4.open(map, marker4);
        });
    }

    //FIFTH LOCATION MARKER
    let marker5 = new google.maps.Marker({
        position: locationCoordinates5,
        map: map,
        icon: icon

    });

    pos.addMarkerName5 = (name5) => {

        let infowindow5 = new google.maps.InfoWindow({
            content: name5,
            maxWidth: 100
        });

        marker5.addListener('click', function () {
            infowindow5.open(map, marker5);
        });
    }


    //SIXTH LOCATION MARKER
    let marker6 = new google.maps.Marker({
        position: locationCoordinates6,
        map: map,
        icon: icon

    });

    pos.addMarkerName6 = (name6) => {

        let infowindow6 = new google.maps.InfoWindow({
            content: name6,
            maxWidth: 100
        });

        marker6.addListener('click', function () {
            infowindow6.open(map, marker6);
        });
    }
}


//This is the original map function that displays the Google Map of Toronto
//When the page originally loads.
//I currently don't have a marker set up
pos.makeMap = function initMap() {
    let toronto = { lat: 43.6532, lng: -79.3832 };
    let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 14,
        center: toronto,
        styles: [
            {
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#f5f5f5"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#eaf1f9"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.attraction",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#cae9f2"
                    }
                ]
            },
            {
                "featureType": "poi.business",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dadff5"
                    }
                ]
            },
            {
                "featureType": "poi.government",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f1daf5"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f6dedf"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#dbf1c5"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "poi.place_of_worship",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b2eeed"
                    }
                ]
            },
            {
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#daddf5"
                    }
                ]
            },
            {
                "featureType": "poi.sports_complex",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f0e9c1"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#dadada"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f6eedd"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#e5e5e5"
                    }
                ]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#e0daf5"
                    }
                ]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#eeeeee"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#c9c9c9"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#b6d8ef"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            }
        ]
    });
}

// for beginning animation to time out
pos.load = function () {
    setTimeout(function () {
        $('.loadscreen-container').hide();
    }, 3500);
}


$(function () {
    pos.load();
    $('button').on('click', function () {
        pos.getLocation();
        $('button').removeClass('animated');
    });
    pos.makeMap();
});