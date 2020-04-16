export function getCurrentLocation(success) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => success(position.coords),error);
    } else {
        console.log("Geolocation is not supported by your browser.")
    }
}

function error(err) {
    if (err.code == 1) {
         alert("Access denied, please allow access to location");
    }
    if (err.code == 2) {
        alert("Position Unavailable");
    }
}

