export function getCurrentLocation(success, error) {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => success(position.coords), error);
    } else {
        console.log("Geolocation is not supported by your browser.")
    }
}
