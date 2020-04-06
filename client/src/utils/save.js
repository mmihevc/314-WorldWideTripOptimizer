import tokml from 'tokml';
import {downloadFile} from "./fileIO";

const KML_MIME_TYPE = 'application/vnd.google-earth.kml+xml';

export function saveKML(destinations) {
    let kml = tokml(getGeoJSON(destinations));
    downloadFile(KML_MIME_TYPE, 'map.kml', kml);
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
                coordinates: [destinations[i].lat, destinations[i].lng]
            }
        });
    }
    let geoJSON = {
        type: 'FeatureCollection',
        features: features
    };
    return geoJSON;
}
