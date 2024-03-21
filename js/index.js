var latt;
var longt;

function getLocation(callback) {
    var xhttp = new XMLHttpRequest();
    xhttp.responseType = 'text';
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var details = JSON.parse(this.responseText);
            callback(details.origin, details.destination);
        }
      };
      xhttp.open("GET", "loc.txt", true);
      xhttp.send(); 
}

function getDirections(origin, dest) {

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;

    directionsService.route({
        origin: origin,
        destination: dest,
        travelMode: 'DRIVING'
    }, function (response, status) {
        if (status === 'OK') {

            // Retrieve the steps from the api query result
            var steps = response.routes[0].legs[0].steps;

            // steps.forEach(function (el, i) {
            //     console.log(i + 1 + ': ' + el.instructions);
            // });

            // Update dom elements direction, distance text and arrow image
            var step
            if(steps[0].distance['value'] < 80){
                if(steps.length == 1){
                    step = {instructions: "Route Complete!", maneuver: "tick"};
                }else{
                    step = steps[1];
                }
            }else{
                step = steps[0];
            }

            var directionParagraph = document.getElementById("direction");
            directionParagraph.innerHTML = step.instructions;

            var distanceParagraph = document.getElementById("distance");
            distanceParagraph.innerHTML = steps[0].distance['text'];

            var arrowImage = document.getElementById("arrow");
            switch (step.maneuver) {
                case "turn-right":
                    arrowImage.src = "img/right.png";
                    break;
                case "turn-left":
                    arrowImage.src = "img/left.png";
                    break;
                case "":
                    arrowImage.src = "img/straight.png";
                    break;
                case "merge-right":
                    arrowImage.src = "img/merge_right.png";
                    break;
                case "merge-left":
                    arrowImage.src = "img/merge_left.png";
                    break;
                case "tick":
                    arrowImage.src = "img/tick.png";
                    break;
            }

        } else {
            alert(status);
        }
        console.log("refreshed");
    });
}

function initMap() {
    getLocation(getDirections);
    setTimeout(initMap, 6000);
};
