const fs = require('fs');
const request = require('request');

function getCurrentLocation(callback) {
    const fileUrl = '/home/dan/Documents/Side/quicky/loc.txt';
    fs.readFile(fileUrl, 'utf8', function (err, data) {
        var locationObject = JSON.parse(data);
        if (err) alert(err);
        callback(locationObject);
    });
}

function initialize() {
    getCurrentLocation(getDirections);
}

function getDirections(locs) {
    request('https://maps.googleapis.com/maps/api/directions/json?origin=' + locs.origin + '&destination=' + locs.destination + '&key=AIzaSyCMM7FDRcmlTq9AsdjHWZrpEYMQJPBq7Y8&mode=driving&traffic_model=best_guess&departure_time=now', { json: true }, (err, res, body) => {
        if (err) { return console.log(err); }
        try {
            var steps = body.routes[0].legs[0].steps;
            console.log(steps[0].html_instructions);
        } catch (e) {
            console.log("error: ", e);
        }
    });
}

initialize();