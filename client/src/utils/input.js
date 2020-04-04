
export function setInput(index, input) {
    let coordInput = document.getElementById('longitudeLatitude'+index);
    let nameInput = document.getElementById('name'+index);
    if (coordInput) {
        coordInput.value = input.coord;
        nameInput.value = input.name;
    }
}

export function getInput(index) {
    return {
        coord: document.getElementById('longitudeLatitude'+index).value,
        name: document.getElementById('name'+index).value
    }
}

export function latLngToString(lat, lng) {
    return lat + ', ' + lng;
}