
export function latLngToString(lat, lng) {
    return lat + ', ' + lng;
}

export function parseIndex(name) {
    return parseInt(name.match(/(\d+)/)[0]);
}

export function parseStateName(name) {
    return "input" + name.match(/([a-zA-Z]+)/)[0];
}
