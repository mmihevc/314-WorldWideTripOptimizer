import tokml from 'tokml';
import {downloadFile} from "./fileIO";
import {getLines} from "./dateline";

const SVG_HEADER = '<?xml version="1.0" standalone="no"?><!DOCTYPE svg PUBLIC ' +
                    '"-//W3C//DTD SVG 1.1//EN"   "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">';
const MARKER_URL = "https://unpkg.com/leaflet@1.6.0/dist/images/marker-icon.png";

const KML_MIME_TYPE = 'application/vnd.google-earth.kml+xml';
const SVG_MIME_TYPE = 'image/svg+xml';
const JSON_MIME_TYPE = 'application/json';
const CSV_MIME_TYPE = 'text/csv';

export function saveKML(destinations) {
    let kml = tokml(getGeoJSON(destinations));
    downloadFile(KML_MIME_TYPE, 'map.kml', kml);
}

export function saveSVG(map, testing) {
    let size = map.getSize();
    let svg = SVG_HEADER + '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink= "http://www.w3.org/1999/xlink" ';
    svg += 'width="' + size.x + '" height="' + size.y+ '">';
    let mapPaneOffset = parseElementTransform(map._mapPane);
    svg += getTileLayerAsSVG(map, mapPaneOffset);
    svg += getPolylineSVG(map, mapPaneOffset);
    svg += getMarkerSVG(map, mapPaneOffset);
    svg += '</svg>';
    if (!testing)
        downloadFile(SVG_MIME_TYPE, 'map.svg', svg);
    return svg;
}

function getTileLayerAsSVG(map, offset) {
    let tiles = map._mapPane.getElementsByClassName("leaflet-tile-loaded");
    let tileSVG = '';
    for (let i=0; i < tiles.length; i++) {
        let tileOffset = parseElementTransform(tiles[i]);
        tileSVG += '<image href="' + tiles[i].src + '" ';
        tileSVG += 'x="' + (tileOffset.x+offset.x) + '" y="'+ (tileOffset.y+offset.y) + '" ';
        tileSVG += 'width="' + tiles[i].width + '" height="' + tiles[i].height + '"/>';
    }
    return tileSVG
}

function getPolylineSVG(map, offset) {
    let polylineLayer = map._mapPane.getElementsByTagName("g");
    if (polylineLayer.length === 0)
        return '';
    let polylineSVG = '<g transform="translate(' + offset.x + ',' + offset.y + ')">';
    polylineSVG += polylineLayer[0].innerHTML + '</g>';
    return polylineSVG;
}

function getMarkerSVG(map, offset) {
    let markers = map._mapPane.getElementsByClassName("leaflet-marker-icon");
    let markerSVG = '';
    for (let i=0; i < markers.length; i++) {
        let markerOffset = parseElementTransform(markers[i]);
        markerSVG += '<image href="' + MARKER_URL + '" ';
        markerSVG += 'x="' + (markerOffset.x-12+offset.x) + '" y="' + (markerOffset.y-40+offset.y) + '"/>';
    }
    return markerSVG;
}

function parseElementTransform(element) {
    let transform = element.style.transform;
    transform = transform.substr(12, transform.length);
    transform = transform.split("px, ");
    return {
        x: parseInt(transform[0]),
        y: parseInt(transform[1])
    }
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
