export function getCurrentLocation(anything) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => anything(position.coords), error);
    } else {
        console.log("Geolocation is not supported by your browser.")
    }
}

function error() {
    alert("This application needs access to your location to work.");
}
