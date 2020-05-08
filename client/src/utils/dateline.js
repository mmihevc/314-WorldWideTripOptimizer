
export function getLines(start, finish) {
    let lines = [];
    checkStartFinish(start, finish);
    let line = [start, finish];
    if (!lineCrossesMeridian(line)) {
        lines = [line];
    } else {
        lines = updateLines(lines, start, finish);
    }
    return lines;
}

function checkStartFinish(start, finish) {
    if (!start || !finish || start === finish)
        return [];
}

function updateLines(lines, start, finish) {
    let lat2 = calculateWrappingLat(start, finish);
    let line1 = [start, {lat: lat2, lng: 180}];
    let line2 = [finish, {lat: lat2, lng: 180}];
    if (start.lng < 0)
        line1[1].lng = -180;
    if (finish.lng < 0)
        line2[1].lng = -180;
    lines = [line1, line2];
    return lines;
}

function calculateWrappingLat(start, finish) {
    let latDiff = (start.lat - finish.lat);
    let lngDiff1 = 180 - Math.abs(start.lng);
    let lngDiff2 = 180 - Math.abs(finish.lng);
    let lat2 = start.lat - (latDiff/2)*(lngDiff1 / ((lngDiff1 + lngDiff2)/2));
    if (start.lat === finish.lat) {
        lat2 = start.lat;
    }
    return lat2;
}

function lineCrossesMeridian(line) {
    return Math.abs(line[0].lng - line[1].lng) >= 180;
}
