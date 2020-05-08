import tokml from 'tokml';
import {downloadFile} from "./fileIO";
import {getLines} from "./dateline";
import {tripToJSON} from "./tripCalls";

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

export function saveJSON(saveInfo){
    let trip = tripToJSON(saveInfo.destinations, saveInfo.earthRadius, saveInfo.optOptions);
    let json = saveInfo.JSON.stringify(trip);
    downloadFile(JSON_MIME_TYPE, 'itinerary.json', json);
    return json;
}

export function saveCSV(saveInfo){
    let trip = tripToJSON(saveInfo.destinations, saveInfo.earthRadius, saveInfo.optOptions);
    let csv = obj2csv(trip)
    downloadFile(CSV_MIME_TYPE, 'itinerary.csv', csv)
    return csv;
}

function checkNull(obj) {
    if (typeof obj !== 'object') return null;
}

function obj2csv(obj, opt) {
    checkNull(obj); opt = opt || {};
    let scopechar = opt.scopechar || '/'; let delimeter = opt.delimeter || ',';
    if (Array.isArray(obj) === false) obj = [obj];
    let curs, name, rownum, key, queue, values = [], rows = [], headers = {}, headersArr = [];
    for (rownum = 0; rownum < obj.length; rownum++) {
        queue = [obj[rownum], '']; rows[rownum] = {};
        while (queue.length > 0) {
            name = queue.pop(); curs = queue.pop();
            if (curs !== null && typeof curs === 'object') {
                for (key in curs) { reduce(key,curs,queue, scopechar) }
            } else {
                if (headers[name] === undefined) headers[name] = true;
                rows[rownum][name] = curs;
            }
        }
        values[rownum] = [];
    }
    for (key in headers) {
        if (headers.hasOwnProperty(key)) {
            headersArr.push(key);
            createCSVText(key, rownum, values, obj);
        }
    }
    join(rownum, obj, values, delimeter);
    return '"' + headersArr.join('"' + delimeter + '"') + '"\n' + values.join('\n');
}

function join(rownum, obj, values, delimeter) {
    for (rownum = 0; rownum < obj.length; rownum++) {
        values[rownum] = values[rownum].join(delimeter);
    }
}

function reduce(key, curs, queue, scopechar) {
    if (curs.hasOwnProperty(key)) {
        queue.push(curs[key]);
        queue.push(name + (name ? scopechar : '') + key);
    }
}

function createCSVText(key, rownum, values, obj) {
    for (rownum = 0; rownum < obj.length; rownum++) {
        values[rownum].push(rows[rownum][key] === undefined
            ? '' : JSON.stringify(rows[rownum][key]));
    }
}

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
