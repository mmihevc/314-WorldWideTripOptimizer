import tokml from 'tokml';
import {downloadFile} from "./fileIO";
import {getLines} from "./dateline";

const SVG_HEADER = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC ' +
                    '"-//W3C//DTD SVG 1.1//EN"   "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';

const KML_MIME_TYPE = 'application/vnd.google-earth.kml+xml';
const SVG_MIME_TYPE = 'image/svg+xml';
const JSON_MIME_TYPE = 'application/json';
const CSV_MIME_TYPE = 'text/csv';

export function saveKML(destinations) {
    let kml = tokml(getGeoJSON(destinations));
    downloadFile(KML_MIME_TYPE, 'map.kml', kml);
}

export function saveSVG(map) {
    let tileCollection = document.getElementsByClassName("leaflet-tile-loaded");
    let tiles = Array.prototype.slice.call(tileCollection);
    console.log(tiles);
    let size = map.getSize();
    let svg = SVG_HEADER + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" width="' +
                            size.x + '" height="' + size.y + '">';
    for (let i=0; i < tiles.length; i++) {
        svg += '<image href="' + tiles[i].src + '" ';
        svg += 'x="' + tiles[i]._leaflet_pos.x + '" y="'+ tiles[i]._leaflet_pos.y + '" ';
        svg += 'width="' + tiles[i].width + '" height="' + tiles[i].height + '"/>';
    }
    svg += '</svg>';
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

export function getGeoJSON(destinations) {
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
