import tokml from 'tokml';
import geojson2svg from 'geojson2svg';
import {downloadFile} from "./fileIO";
import {getLines, lineCrossesMeridian} from "./dateline";

const KML_MIME_TYPE = 'application/vnd.google-earth.kml+xml';
const SVG_MIME_TYPE = 'image/svg+xml';
const JSON_MIME_TYPE = 'application/json';
const CSV_MIME_TYPE = 'text/csv';
const SVG_OPTIONS = {
    viewportSize: {
        width: 500,
        height: 500
    },
    output: 'svg',
    fitTo: 'width'
};

export function saveKML(destinations) {
    let kml = tokml(getGeoJSON(destinations));
    downloadFile(KML_MIME_TYPE, 'map.kml', kml);
}

export function saveSVG(destinations) {
    let svg = geojson2svg(SVG_OPTIONS).convert(getGeoJSON(destinations), SVG_OPTIONS);
    svg = '<svg width="500" height="500">\n' + svg.join('\n') + '\n</svg>';
    downloadFile(SVG_MIME_TYPE, 'map.svg', svg);
}
export function saveJSON(destinations){
    let JSON = destinations;
    downloadFile(JSON_MIME_TYPE, 'itinerary.json', JSON);
}
export function saveCSV(destinations){
    let CSV = destinations;
    downloadFile(CSV_MIME_TYPE, 'itinerary.csv', CSV)
}
//add a similar function but for csv and json so i can still use the download file function from fileio

function getGeoJSON(destinations) {
    let features = [];
    for (let i=0; i < destinations.length; i++) {
        features = features.concat({
            type: 'Feature',
            properties: {
                name: destinations[i].name
            },
            geometry: {
                type: 'Point',
                coordinates: [destinations[i].lng, destinations[i].lat]
            }
        });
    }
    for (let i=0; i < destinations.length-1; i++)
        features = addLineFeature(features, destinations[i], destinations[i+1]);
    features = addLineFeature(features, destinations[destinations.length-1], destinations[0]);
    console.log(features);
    return {
        type: 'FeatureCollection',
        features: features
    };
}

function addLineFeature(features, start, finish) {
    let lines = getLines(start, finish);
    for (let j=0; j < lines.length; j++) {
        features = features.concat({
            type: 'Feature',
            properties: {
                name: ''
            },
            geometry: {
                type: 'LineString',
                coordinates: [
                    [lines[j][0].lng, lines[j][0].lat], [lines[j][1].lng, lines[j][1].lat]
                ]
            }
        });
    }
    return features;
}
