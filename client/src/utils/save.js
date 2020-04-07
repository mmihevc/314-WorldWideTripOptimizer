import tokml from 'tokml';
import geojson2svg from 'geojson2svg';
import {downloadFile} from "./fileIO";

const KML_MIME_TYPE = 'application/vnd.google-earth.kml+xml';
const SVG_MIME_TYPE = 'image/svg+xml';
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
    return {
        type: 'FeatureCollection',
        features: features
    };
}
